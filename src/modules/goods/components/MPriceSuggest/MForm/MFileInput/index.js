import { useFieldArray } from "react-hook-form";

import { CFile2 } from "src/common/components/controls";

export const MFileInput = ({ control }) => {
  //#region Data
  const { fields, append } = useFieldArray({
    control,
    name: "files",
    keyName: "_id",
  });
  //#endregion

  //#region Render
  return (
    <CFile2
      label="Chứng từ đính kèm"
      required
      fields={fields}
      append={append}
    />
  );
  //#endregion
};
