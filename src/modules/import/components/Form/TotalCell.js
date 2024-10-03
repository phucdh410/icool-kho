import { useEffect } from "react";
import { Controller, useWatch } from "react-hook-form";

import { CNumberInput } from "_components/controls";

export const TotalCell = ({ control, index, setValue }) => {
  //#region Data
  const quantity = useWatch({ control, name: `materials.${index}.ware_q` });
  const price = useWatch({ control, name: `materials.${index}.price` });
  //#endregion

  useEffect(() => {
    setValue(`materials.${index}.total`, price * quantity);
  }, [quantity, price, index]);

  //#region Render
  return (
    <Controller
      control={control}
      name={`materials.${index}.total`}
      render={({ field }) => <CNumberInput {...field} readOnly />}
    />
  );
  //#endregion
};
