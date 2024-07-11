import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { CTable, CPagination, CDialog } from "_components/others";
import { useQuery } from "react-query";
import { deXuatHangHoaApi } from "src/1/apis/de_xuat_hang_hoa.api";
import { CButton, CCheckbox } from "src/common/components/controls";
import { useSetQueryData } from "src/1/hooks/query";

export const AddGoodsModal = forwardRef((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset, resetField } = useForm({
    mode: "all",
    defaultValues: { id: "", goods: [] },
  });

  const { data, isFetching } = useQuery({
    queryKey: ["goods-list"],
    queryFn: () => deXuatHangHoaApi.getAll(),
    select: (response) =>
      Array.isArray(response) ? response : response?.data?.data,
  });

  const { setQueryData } = useSetQueryData(["goods-list"]);

  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

  const isSelectAll = useMemo(
    () => data?.every((d) => d.check) ?? false,
    [data]
  );
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log(values);
      } catch (error) {
        noti("error", error?.message || "Lỗi");
      }
    })();
  };

  const onSelect = (code, value) =>
    setQueryData(
      data.map((d) =>
        code === -1 || d.code === code ? { ...d, check: value } : d
      )
    );

  const onClose = () => {
    setOpen(false);
  };

  const onPaginationChange = ({ page, limit }) => {
    setPaginate({ page, limit });
  };

  const select =
    (code = -1) =>
    (v) =>
      onSelect(code, v);
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (id) => {
      resetField("id", id);
      setOpen(true);
    },
  }));

  //#region Render
  const fields = [
    {
      key: "select",
      label: <CCheckbox value={isSelectAll} onChange={select()} />,
      sorter: false,
    },
    {
      key: "code",
      label: "Mã HH",
      _style: { minWidth: "175px" },
    },
    {
      key: "name",
      label: "Tên Hàng Hóa",
      _style: { width: "auto", minWidth: "200px", textAlign: "left" },
    },
    {
      key: "cost",
      label: "Tổng giá trị giá cost",
      _style: { width: "auto", minWidth: "220px" },
    },
    {
      key: "unit",
      label: "Đơn vị tính",
      _style: { width: "160px", minWidth: "160px" },
    },
    {
      key: "price",
      label: "Giá bán",
      _style: { width: "auto", minWidth: "200px" },
    },
    {
      key: "holiday_price",
      label: "Giá lễ",
      _style: { width: "auto", minWidth: "200px" },
    },
  ];

  const render = {
    select: ({ check, code }) => (
      <td>
        <CCheckbox value={check} onChange={select(code)} />
      </td>
    ),
    name: ({ name }) => <td className="text-left">{name}</td>,
    cost: ({ cost }) => <td>{cost?.toLocaleString("vi-VN")}</td>,
    price: ({ price }) => <td>{price?.toLocaleString("vi-VN")}</td>,
    holiday_price: ({ holiday_price }) => (
      <td>{holiday_price?.toLocaleString("vi-VN")}</td>
    ),
  };

  return (
    <CDialog
      className="wide-modal"
      title="Thêm hàng hóa vào Menu"
      show={open}
      onClose={onClose}
    >
      <div>
        <CTable
          className="selectable"
          loading={isFetching}
          data={data ?? []}
          page={paginate.page}
          itemsPerPage={paginate.limit}
          fields={fields}
          render={render}
          footer={
            <CPagination
              page={paginate.page}
              total={data?.length ?? 0}
              limit={paginate.limit}
              onPaginationChange={onPaginationChange}
            />
          }
        />

        <div className="flex justify-center mt-3">
          <CButton className="btn-fill" onClick={onSubmit}>
            Lưu
          </CButton>
        </div>
      </div>
    </CDialog>
  );
  //#endregion
});
