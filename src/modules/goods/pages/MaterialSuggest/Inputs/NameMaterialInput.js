import { Controller, useController, useWatch } from "react-hook-form";
import { CInput } from "_components/controls";
import { useEffect } from "react";

export const NameMaterialInput = ({ control }) => {
  //#region Data
  const chuNguValue = useWatch({ control, name: "subject" });
  const viNguValue = useWatch({ control, name: "predicate" });
  const boNguValue = useWatch({ control, name: "complement" });

  const {
    field: { onChange },
  } = useController({ control, name: "name" });
  //#endregion

  useEffect(() => {
    let _stringName = "";

    chuNguValue && (_stringName += chuNguValue);
    viNguValue && (_stringName += " " + viNguValue);
    boNguValue && (_stringName += " " + boNguValue);

    onChange(_stringName);
  }, [chuNguValue, viNguValue, boNguValue]);

  //#region Render
  return (
    <Controller
      control={control}
      name="name"
      rules={{ required: true }}
      render={({ field: { value, ..._field } }) => (
        <CInput
          readOnly
          label="Tên NVL"
          value={`${value}`}
          style={{ marginBottom: "5px" }}
          {..._field}
          required
        />
      )}
    />
  );
  //#endregion
};
