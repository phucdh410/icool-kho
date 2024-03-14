export const CTag = ({ label, color = "#98ffb6" }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "enter",
        borderRadius: "12px",
        paddingInline: "12px",
        paddingBlock: "6px",
        backgroundColor: color || "#98ffb6",
        fontWeight: 500,
        fontSize: 14,
      }}
    >
      {label}
    </div>
  );
};
