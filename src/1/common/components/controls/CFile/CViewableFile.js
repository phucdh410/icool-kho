import classNames from "classnames";

export const CViewableFile = ({ file }) => {
  return (
    <a
      className={classNames("c-icon", "file")}
      target="_blank"
      rel="noopenner noreferrer"
      href={file?.path}
    ></a>
  );
};
