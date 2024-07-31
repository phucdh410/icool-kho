import { useImperativeHandle, useMemo } from "react";
import { forwardRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";

import { CCardBody, CModal } from "@coreui/react";

import { cuaHangApi } from "src/1/apis/cua_hang.api";
import { useSetQueryData } from "src/1/hooks/query";
import {
  CButton,
  CCheckbox,
  CNumberInput,
  CSelect,
} from "src/common/components/controls";
import { CPagination, CTable } from "src/common/components/others";
import { WEEKDAYS_OPTIONS } from "src/modules/menu/constants";

const defaultValues = {
  price: 0,
  holiday: false,
  from: 1,
  to: 5,
};

export const StoresModal = forwardRef(({ getAddedData }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues,
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-cua-hang"],
    queryFn: () => cuaHangApi.getAll(),
    select: (response) =>
      Array.isArray(response) ? response : response?.data?.data,
  });

  const { setQueryData } = useSetQueryData(["danh-sach-cua-hang"]);

  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

  const isSelectAll = useMemo(() => data?.every((e) => e?.check), [data]);
  //#endregion

  //#region Event
  const onClose = () => {
    reset(defaultValues);
    refetch();
    setOpen(false);
  };

  const onSubmit = () => {
    handleSubmit(async (values) => {
      const payload = data
        ?.filter((e) => e?.check)
        ?.map((e) => ({
          ...e,
          price: values?.price,
          holiday: values?.holiday,
          from: values?.from,
          to: values?.to,
        }));
      getAddedData(payload ?? []);

      onClose();
    })();
  };

  const onPaginationChange = ({ page, limit }) => {
    setPaginate({ page, limit });
  };

  const onSelect =
    (code = -1) =>
    (value) => {
      setQueryData(
        data.map((e) =>
          code === -1 || e?.code === code ? { ...e, check: value } : e
        )
      );
    };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
  }));

  //#region Render
  const fields = [
    {
      key: "select",
      label: <CCheckbox value={isSelectAll} onChange={onSelect()} />,
      sorter: false,
    },
    {
      key: "code",
      label: "Mã combo item",
    },
    {
      key: "name",
      label: "Tên combo item",
    },
  ];

  const render = {
    select: ({ code, check }) => (
      <td>
        <CCheckbox value={check} onChange={onSelect(code)} />
      </td>
    ),
  };
  return (
    <CModal size="lg" show={open} onClose={onClose}>
      <CCardBody>
        <div className="flex flex-col">
          <div className="grid grid-cols-2 gap-x-5 gap-y-1 mb-2">
            <Controller
              control={control}
              name="price"
              render={({ field }) => (
                <CNumberInput {...field} label="Giá bán combo" required />
              )}
            />
            <Controller
              control={control}
              name="holiday"
              render={({ field }) => (
                <CCheckbox
                  {...field}
                  className="mt-9"
                  label="Áp dụng cho cả ngày lễ"
                />
              )}
            />
            <Controller
              control={control}
              name="from"
              render={({ field }) => (
                <CSelect
                  {...field}
                  label="Từ"
                  required
                  options={WEEKDAYS_OPTIONS ?? []}
                  select="value"
                />
              )}
            />
            <Controller
              control={control}
              name="to"
              render={({ field }) => (
                <CSelect
                  {...field}
                  label="Đến"
                  required
                  options={WEEKDAYS_OPTIONS ?? []}
                  select="value"
                />
              )}
            />
          </div>

          <CTable
            className="selectable"
            loading={isFetching}
            fields={fields}
            render={render}
            data={data}
            page={paginate.page}
            itemsPerPage={paginate.limit}
            footer={
              <CPagination
                page={paginate.page}
                total={data?.length}
                limit={paginate.limit}
                onPaginationChange={onPaginationChange}
              />
            }
          />
        </div>
        <div className="w-full flex gap-3 justify-center mt-2">
          <CButton onClick={onClose} className="btn-fill">
            Đóng
          </CButton>
          <CButton onClick={onSubmit}>Thêm chi nhánh</CButton>
        </div>
      </CCardBody>
    </CModal>
  );
  //#endregion
});
