import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import classNames from "classnames";

import "./styles.scss";

const MOCKDATA = {
  title: "Duyệt - Phiếu Luân Chuyển",
  description:
    "Tài khoản 0018 đã duyệt 1 phiếu luân chuyển tôi không biết phải ghi gì để nó dài ra.",
};

export const NotificationContainer = forwardRef((props, ref) => {
  //#region Data
  const [visible, setVisible] = useState(false);
  //#endregion

  //#region Event
  const onToggleClose = () => setVisible(false);
  //#endregion

  useImperativeHandle(ref, () => ({
    open: () => setVisible(true),
    close: () => setVisible(false),
  }));

  useEffect(() => {
    const checkClick = (e) => {
      const notiList = document.getElementById("notifications-list");

      if (!notiList.contains(e.target) && visible) {
        onToggleClose();
      }
    };

    document.addEventListener("click", checkClick);

    return () => {
      document.removeEventListener("click", checkClick);
    };
  }, [visible]);

  //#region Render
  return (
    <>
      <div
        id="notification-container"
        className={classNames(visible && "is-open")}
        onClick={onToggleClose}
      ></div>

      <div id="notifications-list" className={classNames(visible && "is-open")}>
        <h3>Danh sách thông báo</h3>
        <div
          className="list"
          style={{
            paddingInline: "12px",
            paddingBlock: "16px",
            overflow: "auto",
          }}
        >
          {Array(20)
            .fill("")
            .map((e, i) => (
              <div key={i} className="notification-item">
                <h6>{MOCKDATA.title}</h6>
                <p>{MOCKDATA.description}</p>
              </div>
            ))}
        </div>
        <div id="end-list"></div>
      </div>
    </>
  );
  //#endregion
});
