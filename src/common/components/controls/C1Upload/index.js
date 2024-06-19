import { useRef } from "react";
import { fileApi } from "src/1/apis/file.api";

const validateFileType = (file, accept = "image/*") => {
  // Split the accept string into an array of accepted types
  const acceptedTypes = accept.split(",").map((type) => type.trim());

  // Get the file type
  const fileType = file.type;
  const fileExtension = file.name.split(".").pop();

  // Check if the file type matches any of the accepted types
  const isValidType = acceptedTypes.some((type) => {
    // Check for exact type match
    if (type === fileType) {
      return true;
    }

    // Check for extension match
    if (type.charAt(0) === "." && fileExtension === type.slice(1)) {
      return true;
    }

    // Check for wildcard type match (e.g., image/*)
    const [typeMain, typeSubtype] = type.split("/");
    if (typeSubtype === "*" && fileType.startsWith(typeMain)) {
      return true;
    }

    return false;
  });

  return isValidType;
};

export const C1Upload = ({
  label,
  required,
  accept = "image/*",
  value,
  onChange,
}) => {
  //#region Data
  const inputRef = useRef(null);
  //#endregion

  //#region Event
  const onClick = () => {
    inputRef.current?.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files?.[0];

    if (file) {
      const isValid = validateFileType(file, accept);
      if (isValid) {
        try {
          const res = await fileApi.upload(file);

          onChange(res?.data?.data);
        } catch (error) {
          console.log(error);
          noti("error", "Upload lỗi!");
        } finally {
          inputRef.current.value = null;
        }
      } else {
        noti("error", "File không đúng định dạng!");
        inputRef.current.value = null;
        return;
      }
    }
  };
  //#endregion

  //#region Render
  return (
    <div>
      {label && (
        <label className="text-black font-medium mb-0 mt-0" htmlFor="c-1upload">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <div className="flex items-center h-10 w-full mt-[1px]">
        <input
          ref={inputRef}
          onChange={onFileChange}
          type="file"
          hidden
          id="c-1upload"
          accept={accept}
          multiple={false}
        />
        <div className="flex flex-1 items-center input-file-wrapper h-[inherit] border-t border-l border-b border-[#D7D7D7] rounded-s-md !pl-3 pr-8">
          {value ? (
            <span className="font-medium whitespace-nowrap text-ellipsis overflow-hidden">
              {value?.originalname}
            </span>
          ) : (
            <>
              <i className="fa-regular fa-cloud-arrow-up text-lg pr-2"></i>
              <span
                onClick={onClick}
                className="text-[#B3B3B3] text-base cursor-pointer"
              >
                Tải file lên
              </span>
            </>
          )}
        </div>
        <button
          onClick={onClick}
          className="text-white bg-[#117DB7] h-[inherit] !border-none !outline-none rounded-e-md font-semibold px-3 tracking-wide"
        >
          Upload
        </button>
      </div>
    </div>
  );
  //#endregion
};
