import classNames from "classnames";

const baseColors = {
  default: "#053C7F",
  error: "#F26464",
  success: "#43BE18",
  warning: "#FFB946",
};

const mapColor = (colorString) => {
  if (!colorString) {
    return baseColors.default;
  } else if (baseColors?.[colorString]) {
    return baseColors[colorString];
  } else {
    return colorString;
  }
};

export const CIconButton = ({
  color = "",
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
      style={{ color: mapColor(color), ...style }}
      {...props}
    >
      {icon}
    </button>
  );
};
