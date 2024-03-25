import { Controller, useController, useWatch } from "react-hook-form";
import { CInput } from "_components/controls";
import { useEffect } from "react";

export const CodeMaterialInput = ({ control }) => {
  //#region Data
  const nganhValue = useWatch({ control, name: "nganh" });
  const nhomValue = useWatch({ control, name: "nhom" });
  const loaiValue = useWatch({ control, name: "loai" });
  const vitriValue = useWatch({ control, name: "vi_tri" });
  const qldateValue = useWatch({ control, name: "quan_ly_date" });

  const {
    field: { onChange },
  } = useController({ control, name: "code" });
  //#endregion

  useEffect(() => {
    let _stringCode = "";

    nganhValue?.acronym && (_stringCode += nganhValue.acronym + ".");
    nhomValue?.acronym && (_stringCode += nhomValue.acronym + ".");
    loaiValue?.acronym && (_stringCode += loaiValue.acronym + ".");
    vitriValue?.acronym && (_stringCode += vitriValue.acronym + ".");
    qldateValue ? (_stringCode += "YES.") : (_stringCode += "NO.");

    onChange(_stringCode);
  }, [nganhValue, nhomValue, loaiValue, vitriValue, qldateValue]);

  //#region Render
  return (
    <Controller
      control={control}
      name="code"
      rules={{ required: true }}
      render={({ field: { value, ..._field } }) => (
        <CInput
          readOnly
          label="Mã NVL"
          value={`${value}0001`}
          style={{ marginBottom: "5px" }}
          {..._field}
          required
        />
      )}
    />
  );
  //#endregion
};
