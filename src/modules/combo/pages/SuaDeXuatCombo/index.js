import { useForm } from "react-hook-form";

import { ComboForm } from "../../components";
import { comboDefaultValues } from "../../form";

const SuaDeXuatCombo = () => {
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
        noti("error", error?.message ?? "Thêm đề xuất combo thành công!");
      }
    })();
  };
  //#endregion

  //#region Render
  return <ComboForm control={control} onSubmit={onSubmit} />;
  //#endregion
};
export default SuaDeXuatCombo;
