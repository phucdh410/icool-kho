import toast from "react-hot-toast";

import "./styles.scss";

export const CNotification = ({ t }) => {
  console.log("🚀 ~ CNotification ~ t:", t);

  const onClose = () => {
    toast.dismiss(t?.id);
  };

  return (
    <div className="c-notification">
      <div className="content">
        <p
          style={{
            marginBottom: "3px",
            fontSize: "1rem",
            fontWeight: 600,
            lineHeight: "28px",
            color: "#003397",
          }}
        >
          {t?.notification?.title || "Title"}
        </p>
        <p style={{ fontWeight: 500, color: "#3A3A3A" }}>
          {t?.notification?.body || "Body"}
        </p>
      </div>
      <div className="divider"></div>
      <button onClick={onClose} className="close-button">
        Close
      </button>
    </div>
  );
};
