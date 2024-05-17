import { useEffect, useState } from "react";
import {
  isSupported,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
import { app } from "./config";
import toast from "react-hot-toast";
import { CNotification } from "src/common/components/others";

export const requestPermission = async () => {
  console.log("Requesting permission...");
  const permission = await Notification.requestPermission();
  console.log("🚀 ~ requestPermission ~ permission:", permission);
  if (permission === "granted") {
    console.log("Notification permission granted.");
  } else {
    console.log("Permission denied.");
  }

  return permission;
};

export const FirebaseRoot = () => {
  //#region Data
  const vapidKey =
    "BB4RqxfMWd8C1hevOO7feEo8Np6lT45_2AAzlgSGxpJ6AS6-ZbxCMcqfrkZYb5ixckgDm6gWwTr-5BFmUN5aLrA";

  const [permission, setPermission] = useState(false);

  const [open, setOpen] = useState(false);
  //#endregion

  //#region Event
  const onClose = () => setOpen(false);

  const checkPermissionNotification = async () => {
    const isSup = await isSupported();

    if (!isSup) return;

    const messaging = getMessaging(app);

    const isPermission = await requestPermission();

    setPermission(isPermission === "granted");

    if (isPermission) setOpen(true);

    if (isPermission === "granted") {
      getToken(messaging, { vapidKey }).then(async (currentToken) => {
        if (currentToken) {
          // await updateFirebaseToken(currentToken); //TODO: send token to BE

          onMessage(messaging, (payload) => {
            console.log("Có một thông báo mới !!! ", payload);
            toast(() => <CNotification t={payload} />);
          });
        } else {
        }
      });
    }
  };

  // const checkServiceWorkerNoti = (event) => {
  //   if (event?.data && !event.data?.isFirebaseMessaging === true) {
  //     console.log(event.data);
  //     dispatch(setNotifications(formatNotification(event.data)));
  //   }
  // };
  //#endregion

  useEffect(() => {
    checkPermissionNotification();
  }, [app]);

  // useEffect(() => {
  //   navigator?.serviceWorker?.addEventListener(
  //     "message",
  //     checkServiceWorkerNoti
  //   );
  //   return () => {
  //     navigator?.serviceWorker?.removeEventListener(
  //       "message",
  //       checkServiceWorkerNoti
  //     );
  //   };
  // }, [navigator?.serviceWorker]);

  //#region render
  return !permission && open ? (
    <div
      style={{
        textAlign: "right",
        padding: "8px 20px",
        background: "#053c7f",
        color: "white",
      }}
    >
      Lưu ý bạn đang tắt tính năng nhận thông báo —&nbsp;
      <strong>Bật lại tính năng này để nhận các thông báo mới nhất!</strong>
    </div>
  ) : (
    <></>
  );
  //#endregion
};
