import classNames from "classnames";

export const CFileItem = ({ file, clickable = true, className, ...props }) => {
  return clickable ? (
    <a
      href={file?.path}
      target="_blank"
      rel="noopener noreferrer"
      className={classNames(
        "text-[#17BD08] font-medium no-underline hover:underline hover:text-[#008939]",
        className
      )}
      {...props}
    >
      {file?.originalname}
    </a>
  ) : (
    <p {...props}>{file?.originalname}</p>
  );
};
