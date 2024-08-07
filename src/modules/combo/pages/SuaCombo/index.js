import { useForm } from "react-hook-form";

import { ComboForm } from "../../components";
import { comboDefaultValues } from "../../form";

const SuaCombo = () => {
  //#region Data
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues: comboDefaultValues,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
      } catch (error) {
        noti("error", error?.message ?? "Sửa combo thành công!");
      }
    })();
  };
  //#endregion

  //#region Render
  return <ComboForm control={control} onSubmit={onSubmit} />;
  //#endregion
};
export default SuaCombo;
