import { useEffect, useMemo } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";

import { CCard, CCardBody } from "@coreui/react";

import { deXuatNhaCungCapApi } from "src/1/apis/de_xuat_nha_cung_cap.api";
import { history } from "src/App";

import { FormTable, FormToolbar } from "../../components";
import { defaultValues, resolver } from "../../form";

const SuaDeXuatNhaCungCap = () => {
  //#region Data
  const params = useParams();

  const { data, isError } = useQuery({
    queryKey: ["chi-tiet-de-xuat-nha-cung-cap", params?.id],
    queryFn: () => deXuatNhaCungCapApi.getById(params?.id),
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

  const { fields, append, remove, replace } = useFieldArray({
    control,
    name: "suppliers",
    keyName: "__id",
  });

  const watchSuppliers = useWatch({ control, name: "suppliers" });

  const controlledSuppliers = fields.map((field, index) => {
    return {
      ...field,
      ...watchSuppliers[index],
    };
  });

  const isSelectedAll = useMemo(
    () =>
      controlledSuppliers?.length &&
      controlledSuppliers?.every((e) => e?.selected),
    [controlledSuppliers]
  );

  const selectedList = useMemo(
    () => controlledSuppliers.filter((e) => e?.selected),
    [controlledSuppliers]
  );
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
        await deXuatNhaCungCapApi.update(params.id, payload);

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

  const onSelectAll = (value) => {
    const newSuppliers = controlledSuppliers.map((e) => ({
      ...e,
      selected: value,
    }));
    replace(newSuppliers);
  };

  const onRemove = () => {
    let removeIndexs = [];
    controlledSuppliers.forEach((e, i) => {
      if (e.selected) {
        removeIndexs.push(i);
      }
    });
    remove(removeIndexs);
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
            canRemove={selectedList?.length}
            onRemove={onRemove}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody className="px-0 pt-4">
          <FormTable
            control={control}
            dataTable={controlledSuppliers}
            isSelectedAll={isSelectedAll}
            onSelectAll={onSelectAll}
          />
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};
export default SuaDeXuatNhaCungCap;
