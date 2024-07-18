import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { CTable, CPagination, CDialog } from "_components/others";
import { useQuery } from "react-query";
import { hangHoaApi } from "src/1/apis/hang_hoa.api";
import {
  CButton,
  CCheckbox,
  CInput,
  CSelect,
} from "src/common/components/controls";
import { useSetQueryData } from "src/1/hooks/query";
import { PRICE_TYPES_OPTIONS } from "../../constants";
import { menuApi } from "src/1/apis/menu.api";

export const AddGoodsModal = forwardRef((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const { control, handleSubmit, reset, watch } = useForm({
    mode: "all",
    defaultValues: {
      id: "",
      normal_or_holiday: "normal",
      menu_name: "",
      goods_ids: [],
    },
  });

  const { fields: formFields, replace } = useFieldArray({
    control,
    name: "goods_ids",
    keyName: "__id",
  });

  const { data, isFetching } = useQuery({
    queryKey: ["goods-list"],
    queryFn: () => hangHoaApi.getAll(),
    select: (response) =>
      Array.isArray(response) ? response : response?.data?.data,
  });

  const { setQueryData } = useSetQueryData(["goods-list"]);

  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

  const isSelectAll = useMemo(
    () => data?.every((d) => d.check) ?? false,
    [data]
  );

  const selected = useMemo(() => data?.filter((e) => e.check) ?? [], [data]);
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          normal_or_holiday:
            values?.normal_or_holiday === "normal" ? false : true,
          goods_ids: selected?.map((e) => e?.id),
        };
        await menuApi.updateGoodsToMenu(values?.id, payload);

        noti("success", "Cập nhật hàng hóa cho menu thành công!");
        onClose();
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
    reset();
  };

  const onPaginationChange = ({ page, limit }) => {
    setPaginate({ page, limit });
  };

  const select =
    (code = -1) =>
    (v) =>
      onSelect(code, v);

  const onTypeChange = (changeCb) => (selectedOption) => {
    select()(false);
    changeCb(selectedOption?.value);
  };
  //#endregion

  useImperativeHandle(ref, () => ({
    open: async (id, name) => {
      try {
        const res = await menuApi.getGoodsInMenu(id);

        if (res?.data?.data) {
          const stringCodes = res.data.data.map((e) => e?.code);

          setQueryData(
            data.map((e) => ({ ...e, check: stringCodes.includes(e?.code) }))
          );
        }
      } catch (error) {
        console.error(error);
      } finally {
        reset({
          id,
          menu_name: name,
          price_type: "normal",
          goods_ids: [],
        });
        setOpen(true);
      }
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
  ];

  const render = {
    select: ({ check, code }) => (
      <td>
        <CCheckbox value={check} onChange={select(code)} />
      </td>
    ),
    name: ({ name }) => <td className="text-left">{name}</td>,
    cost: ({ cost }) => <td>{cost?.toLocaleString("vi-VN")}</td>,
    price: ({ price, holiday_price }) => (
      <td>
        {(watch("price_type") === "normal"
          ? price
          : holiday_price
        )?.toLocaleString("vi-VN")}
      </td>
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
        <div className="flex items-center gap-3 mb-2 max-w-[700px]">
          <Controller
            control={control}
            name="menu_name"
            render={({ field }) => (
              <CInput {...field} label="Tên menu" readOnly className="flex-1" />
            )}
          />
          <Controller
            control={control}
            name="normal_or_holiday"
            render={({ field: { onChange, ..._field } }) => (
              <CSelect
                options={PRICE_TYPES_OPTIONS ?? []}
                label="Giá bán"
                className="flex-1"
                onChange={onTypeChange(onChange)}
                {..._field}
              />
            )}
          />
        </div>

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
