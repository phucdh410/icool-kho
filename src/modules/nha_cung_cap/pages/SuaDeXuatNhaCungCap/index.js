import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { CCard, CCardBody } from "@coreui/react";

import { nhaCungCapApi } from "src/1/apis/nha_cung_cap.api";
import { history } from "src/App";

import { FormTable, FormToolbar } from "../../components";
import { defaultValues, resolver } from "../../form";

const SuaDeXuatNhaCungCap = () => {
  //#region Data
  const params = useParams();

  const { data, isError } = useQuery({
    queryKey: ["chi-tiet-de-xuat-nha-cung-cap", params?.id],
    queryFn: () => nhaCungCapApi.getDetailSuggest(params?.id),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
  });

  if (isError) {
    noti("error", "Không thể lấy thông tin đề xuất nhà cung cấp!");
    history.replace("/supplier-suggest/list");
  }

  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues,
    resolver,
  });

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
        await nhaCungCapApi.updateSuggest(params.id, payload);

        noti("success", "Sửa đề xuất nhà cung cấp thành công!");
        reset(defaultValues);
        history.push("/supplier-suggest/list");
      } catch (error) {
        noti(
          "error",
          error?.message ?? "Sửa đề xuất nhà cung cấp không thành công!"
        );
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        evaluation_date: dayjs(data?.evaluation_date).toDate(),
        suppliers: data?.suppliers?.map((e) => ({
          ...e,
          materials: e?.materials?.map((el) => el?.material_code),
        })),
      });
    }
  }, [data]);

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

      <CCard>
        <CCardBody className="px-0 pt-4">
          <FormTable control={control} dataTable={fields} />
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};
export default SuaDeXuatNhaCungCap;
