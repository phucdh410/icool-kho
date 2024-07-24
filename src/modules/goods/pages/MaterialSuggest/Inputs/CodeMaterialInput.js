import { useEffect } from "react";
import { Controller, useController, useWatch } from "react-hook-form";

import { CInput } from "_components/controls";

export const CodeMaterialInput = ({ control, isEdit }) => {
  //#region Data
  const nganhValue = useWatch({ control, name: "nganh" });
  const nhomValue = useWatch({ control, name: "nhom" });
  const loaiValue = useWatch({ control, name: "materialTypeCode" });
  const vitriValue = useWatch({ control, name: "materialLocation" });
  const qldateValue = useWatch({ control, name: "expired" });

  const {
    field: { onChange },
  } = useController({ control, name: "code" });
  //#endregion

  useEffect(() => {
    if (isEdit) {
      return;
    }

    let _stringCode = "";

    nganhValue?.acronym && (_stringCode += nganhValue.acronym + ".");
    nhomValue?.acronym && (_stringCode += nhomValue.acronym + ".");
    loaiValue?.acronym && (_stringCode += loaiValue.acronym + ".");
    vitriValue?.acronym && (_stringCode += vitriValue.acronym + ".");
    qldateValue ? (_stringCode += "YES.") : (_stringCode += "NO.");

    onChange(_stringCode);
  }, [nganhValue, nhomValue, loaiValue, vitriValue, qldateValue, isEdit]);

  //#region Render
  return (
    <Controller
      control={control}
      name="code"
      rules={{ required: true }}
      render={({ field: { value, ..._field } }) => (
        <CInput
          readOnly={!isEdit}
          disabled={isEdit}
          label="Mã NVL"
          value={isEdit ? value : `${value}0001`}
          style={{ marginBottom: "5px" }}
          {..._field}
          required
        />
      )}
    />
  );
  //#endregion
};
