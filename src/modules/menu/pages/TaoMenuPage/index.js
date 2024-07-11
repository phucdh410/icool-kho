import { useForm } from "react-hook-form";
import { defaultValues, resolver } from "../../form";
import { MenuForm } from "../../components";
import { history } from "src/App";
import dayjs from "dayjs";
import { menuApi } from "src/1/apis/menu.api";

const TaoMenuPage = () => {
  //#region Data
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues,
    resolver,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          ...values,
          date: dayjs(values?.date).format("YYYY-MM-DD"),
        };

        await menuApi.create(payload);

        noti("success", "Tạo menu thành công!");
        reset();

        history.push("/menus/list");
      } catch (error) {
        noti("error", error?.message ?? "Lỗi");
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <MenuForm onSubmit={onSubmit} control={control} />
    </>
  );
  //#endregion
};
export default TaoMenuPage;
