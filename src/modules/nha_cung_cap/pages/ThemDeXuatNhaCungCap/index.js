import { useFieldArray, useForm } from "react-hook-form";
import dayjs from "dayjs";

import { CCard, CCardBody } from "@coreui/react";

import { nhaCungCapApi } from "src/1/apis/nha_cung_cap.api";

import { FormTable, FormToolbar } from "../../components";
import { defaultValues, resolver } from "../../form";

const ThemDeXuatNhaCungCap = () => {
  //#region Data
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { isSubmitting },
  } = useForm({ mode: "all", defaultValues, resolver });

  const { fields, append } = useFieldArray({
    control,
    name: "suppliers",
    keyName: "__id",
  });
  //#endregion

  //#region Event
  const onAddSupplier = () => {
    append({
      code: "",
      name: "",
      financial: 5,
      reputation: 5,
      quality: 5,
      pricing: 5,
      materials: [],
      files: [],
    });
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          ...values,
          evaluation_date: dayjs(values?.evaluation_date).format("YYYY-MM-DD"),
          suppliers: values?.suppliers?.map((e) => ({
            ...e,
            files: e?.files?.map((el) => el?.id),
          })),
        };
        await nhaCungCapApi.createSuggest(payload);

        noti("success", "Tạo đề xuất nhà cung cấp thành công!");
        reset(defaultValues);
      } catch (error) {
        console.log("🚀 ~ handleSubmit ~ error:", error);
        noti(
          "error",
          error?.message ?? "Thêm đề xuất nhà cung cấp không thành công!"
        );
      }
    })();
  };
  //#endregion

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <FormToolbar
            control={control}
            onSubmit={onSubmit}
            onAddSupplier={onAddSupplier}
          />
        </CCardBody>
      </CCard>

      <button
        onClick={() => {
          console.log(getValues());
        }}
      >
        Log
      </button>

      <CCard>
        <CCardBody className="px-0 pt-4">
          <FormTable control={control} dataTable={fields} />
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};
export default ThemDeXuatNhaCungCap;
