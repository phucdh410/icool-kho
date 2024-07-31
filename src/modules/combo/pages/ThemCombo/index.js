import { useForm } from "react-hook-form";
import dayjs from "dayjs";

import { comboApi } from "src/1/apis/combo.api";
import { history } from "src/App";

import { ComboForm } from "../../components";
import { comboDefaultValues } from "../../form";

const ThemCombo = () => {
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
        const payload = {
          ...values,
          file_id: values?.file_id?.id,
          from: dayjs(values?.from).format("YYYY-MM-DD"),
          to: dayjs(values?.to).format("YYYY-MM-DD"),
        };
        await comboApi.create(payload);
        noti("success", "Tạo đề xuất combo thành công!");
        // reset(comboDefaultValues)
        // history.push("/combos/suggest-list");
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
export default ThemCombo;
