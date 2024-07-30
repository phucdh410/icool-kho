import classNames from "classnames";

export const CIconButton = ({
  color = "#053C7F",
  disabled = false,
  onClick = () => {},
  icon,
  className = "",
  style = {},
  ...props
}) => {
  return (
    <button
      className={classNames(
        "c-icon-button h-5 w-5 !outline-none",
        className,
        disabled && "!text-[#979797]"
      )}
      onClick={onClick}
      style={{ color, ...style }}
      {...props}
    >
      {icon}
    </button>
  );
};
