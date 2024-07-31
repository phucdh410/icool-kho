import { useImperativeHandle, useMemo } from "react";
import { forwardRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useQuery } from "react-query";

import { CCardBody, CModal } from "@coreui/react";

import { comboItemApi } from "src/1/apis/combo_item.api";
import { useSetQueryData } from "src/1/hooks/query";
import {
  CButton,
  CCheckbox,
  CNumberInput,
} from "src/common/components/controls";
import { CPagination, CTable } from "src/common/components/others";

const defaultValues = {
  default_quantity: 1,
};

export const ComboItemModal = forwardRef(({ getAddedData }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues,
  });

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["danh-sach-combo-items"],
    queryFn: () => comboItemApi.getAll(),
    select: (response) =>
      Array.isArray(response) ? response : response?.data?.data,
  });

  const { setQueryData } = useSetQueryData(["danh-sach-combo-items"]);

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
        ?.map((e) => ({ ...e, quantity: values?.default_quantity }));
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
    {
      key: "unit",
      label: "Đơn vị tính",
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
          <Controller
            control={control}
            name="default_quantity"
            render={({ field }) => (
              <CNumberInput
                {...field}
                className="mb-2 max-w-[300px]"
                label="Số lượng"
                required
              />
            )}
          />
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
          <CButton onClick={onSubmit}>Thêm combo item</CButton>
        </div>
      </CCardBody>
    </CModal>
  );
  //#endregion
});
