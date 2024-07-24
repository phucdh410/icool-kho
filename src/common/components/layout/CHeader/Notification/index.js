import { useRef, useState } from "react";

import { ReactComponent as NotiIcon } from "./notification.svg";
import { NotificationContainer } from "./NotificationContainer";

import "./styles.scss";

export const Notification = () => {
  //#region Data
  const [newNotis, setNewNotis] = useState(8);

  const notiListRef = useRef(null);
  //#endregion

  //#region Event
  const onOpenList = () => {
    notiListRef.current?.open();
    setNewNotis(0);
  };
  //#endregion

  //#region Render
  return (
    <div id="header-notification-wrapper">
      <div id="header-notification" onClick={onOpenList}>
        <NotiIcon />
      </div>

      {newNotis > 0 && (
        <div id="notification-badge">{newNotis >= 10 ? "9+" : newNotis}</div>
      )}

      <NotificationContainer ref={notiListRef} />
    </div>
  );
  //#endregion
};
