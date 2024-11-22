import classNames from "classnames";

export const CFileItem = ({ file, clickable = true, className, ...props }) => {
  return clickable ? (
    <a
      href={file?.path}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        "text-[#17BD08] text-ellipsis overflow-hidden whitespace-nowrap font-medium no-underline hover:underline hover:text-[#008939]",
        className
      )}
      {...props}
    >
      {file?.original_name}
    </a>
  ) : (
    <p {...props}>{file?.original_name}</p>
  );
};
