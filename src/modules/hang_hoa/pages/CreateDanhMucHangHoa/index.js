import { useForm } from "react-hook-form";
import { MatHangForm } from "../../components";
import { deXuatHangHoaApi } from "src/1/apis/de_xuat_hang_hoa.api";
import { history } from "src/App";

const CreateDanhMucHangHoa = () => {
  //#region Data
  const {
    control,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    mode: "all",
    defaultValues: {
      industry_code: "",
      group_id: "",
      subject: "",
      predicate: "",
      complement: "",
      code: "",
      unit: "",
      standard: "",
      file: "",
      materials: [],
      cost: 0,
      ware_note: "",
      accountant_note: "",
      ic_note: "",
      operator_note: "",
    },
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          ...values,
          name: values?.name
            ? values.name
            : values.subject + " " + values.predicate + " " + values.complement,
          group_id: values.group_id?.value,
          file: values.file?.id,
          materials: values.materials.map((e) => ({
            nvl_id: e?.nvl_id?.value,
            quantity: e?.quantity,
            ware_unit: e?.ware_unit,
          })),
        };

        await deXuatHangHoaApi.create(payload);

        noti("success", "Tạo đề xuất hàng hóa thành công!");
        reset();
        history.push("/goods/list");
      } catch (error) {
        noti("error", error?.message);
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <MatHangForm
      control={control}
      isSubmitting={isSubmitting}
      onSubmit={onSubmit}
    />
  );
  //#endregion
};

export default CreateDanhMucHangHoa;
