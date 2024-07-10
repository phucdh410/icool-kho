import { useForm } from "react-hook-form";
import { defaultValues, resolver } from "../../form";
import { CCard, CCardBody } from "@coreui/react";
import { FormToolbar, MenuForm } from "../../components";

const TaoMenuPage = () => {
  //#region Data
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ mode: "all", defaultValues, resolver });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
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
