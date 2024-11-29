import { useMemo } from "react";
import toast from "react-hot-toast";
import classNames from "classnames";

import { history } from "src/App";

import "./styles.scss";

export const CNotification = ({ notificationPayload }) => {
  console.log("🚀 ~ CNotification ~ notificationPayload:", notificationPayload);
  //#region Data
  // console.log("🚀 ~ CNotification ~ t:", t);

  const notification = useMemo(() => {
    if (!notificationPayload) {
      return null;
    } else {
      return {
        title: notificationPayload?.notification?.title ?? "",
        body: notificationPayload?.notification?.body ?? "",
        additional: notificationPayload?.data ?? null,
        //{ url: string }
      };
    }
  }, [notificationPayload]);
  //#endregion

  //#region Event
  const onClose = () => {
    toast.dismiss(t?.id);
  };
  //#endregion

  //#region Render
  return (
    <div className="c-notification">
      <div className="content">
        <p
          className={classNames(
            notification?.additional?.url && "cursor-pointer"
          )}
          style={{
            marginBottom: "3px",
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: "28px",
            color: "#003397",
          }}
          onClick={() =>
            notification?.additional?.url
              ? history.push(notification.additional.url)
              : undefined
          }
        >
          {notification?.title || "Title"}
        </p>
        <p style={{ fontWeight: 500, color: "#3A3A3A" }}>
          {notification?.body || "Body"}
        </p>
      </div>
      <div className="divider"></div>
      <button onClick={onClose} className="close-button">
        Close
      </button>
    </div>
  );
  //#endregion
};
