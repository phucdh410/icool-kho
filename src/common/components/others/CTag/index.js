export const CTag = ({ label, color = "rgb(189 255 208)" }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "enter",
        borderRadius: "8px",
        paddingInline: "12px",
        paddingBlock: "6px",
        backgroundColor: color || "rgb(189 255 208)",
        fontWeight: 500,
        fontSize: 14,
        boxShadow: "0 0 4px 2px rgb(0 0 0 / 12%)",
      }}
    >
      {label}
    </div>
  );
};
