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

const DanhGiaDeXuatNhaCungCap = () => {
  //#region Data
  const params = useParams();

  const { data, isError } = useQuery({
    queryKey: ["chi-tiet-danh-gia-de-xuat-ncc", params?.id],
    queryFn: () => nhaCungCapApi.getDetailSuggest(params?.id),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
  });

  if (isError) {
    noti("error", "Không thể lấy thông tin đề xuất nhà cung cấp!");
    history.replace("/supplier-suggest/list");
  }

  const { control, reset } = useForm({
    mode: "all",
    defaultValues,
    resolver,
  });

  const { fields } = useFieldArray({
    control,
    name: "suppliers",
    keyName: "__id",
  });
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
          <FormToolbar control={control} onlyView />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody className="px-0 pt-4">
          <FormTable control={control} dataTable={fields} onlyView />
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};
export default DanhGiaDeXuatNhaCungCap;
