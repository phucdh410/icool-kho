import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  getMessaging,
  getToken,
  isSupported,
  onMessage,
} from "firebase/messaging";

import { CNotification } from "src/common/components/others";

import { app } from "./config";

export const requestPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    // console.log("Notification permission granted.");
  } else {
    // console.log("Permission denied.");
  }

  return permission;
};

export const FirebaseRoot = () => {
  //#region Data
  const vapidKey =
    "BF5PxHqu_mufvH2fkUrXaQkuxgl_vap-iVH8ozBIzxxmhXQY6zyIHCHvoAiNxZab-YK06daMJhd5N2FlLxfPBYk";

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
          console.log("🚀 Your firebase token:", currentToken);
          // await updateFirebaseToken(currentToken); //TODO: send token to BE

          onMessage(messaging, (payload) => {
            toast(() => <CNotification notificationPayload={payload} />, {
              duration: 10000,
            });
          });
        } else {
          console.error("Không thể lấy được token cho firebase!");
        }
      });
    }
  };

  const checkServiceWorkerNoti = (event) => {
    if (event?.data && !event.data?.isFirebaseMessaging === true) {
      console.log(event.data);
      // dispatch(setNotifications(formatNotification(event.data)));
    }
  };
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
