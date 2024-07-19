import { CModal } from "@coreui/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { menuApi } from "src/1/apis/menu.api";
import { CButton, CSelect } from "src/common/components/controls";
import { PRICE_TYPES_OPTIONS } from "src/modules/menu/constants";
import { MenuTable } from "./MenuTable";
import { hangHoaApi } from "src/1/apis/hang_hoa.api";

export const AddToMenuModal = forwardRef((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const [priceType, setPriceType] = useState("normal");
  const [currentMenu, setCurrentMenu] = useState(null);

  const { control, reset, handleSubmit, watch } = useForm({
    mode: "all",
    defaultValues: {
      code: "",
      normal_price: 0,
      holiday_price: 0,
      menu_ids: [],
    },
  });

  const {
    fields: fieldsForm,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "menu_ids",
    keyName: "__id",
  });

  const { data: menu_options } = useQuery({
    queryKey: ["menu-list"],
    queryFn: () => menuApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({
        ...e,
        value: e?.id,
        label: e?.name,
      })),
  });
  //#endregion

  //#region Event
  const onClose = () => {
    reset();
    setPriceType("normal");
    setOpen(false);
  };

  const onTypeChange = (selectedOption) => setPriceType(selectedOption?.value);

  const onMenuChange = (selectedOption) => setCurrentMenu(selectedOption);

  const onAdd = () => {
    const existed = watch("menu_ids").some((e) => e?.id === currentMenu?.id);

    if (existed) {
      noti("error", "Hàng hóa đã tồn tại trong menu này!");
    } else {
      const { id, name, from, to } = currentMenu;
      append({
        id,
        name,
        from,
        to,
        normal_price: watch("normal_price"),
        holiday_price: watch("holiday_price"),
        normal_or_holiday: priceType === "holiday",
      });
    }
  };

  const onRemove = (index) => () => {
    remove(index);
  };

  const onSave = () => {
    handleSubmit(async (values) => {
      try {
        const payload = {
          data: values?.menu_ids?.map((e) => ({
            menu_id: e?.id,
            normal_or_holiday: e?.normal_or_holiday,
          })),
        };

        await hangHoaApi.updateMenuByGoodsCode(values?.code, payload);

        noti("success", "Cập nhật hàng hóa vào menu thành công!");
        onClose();
      } catch (error) {
        noti("error", error?.message || "Lỗi");
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (menu_options && menu_options?.length > 0) {
      setCurrentMenu(menu_options[0]);
    }
  }, [menu_options]);

  useImperativeHandle(ref, () => ({
    open: async (goodsData) => {
      const code = goodsData?.code;
      const normal_price = goodsData?.price;
      const holiday_price = goodsData?.holiday_price;
      let menu_ids = [];

      try {
        const res = await hangHoaApi.getMenuByGoodsCode(code);

        if (res?.data?.data) {
          menu_ids = res.data.data?.map((e) => ({
            ...e,
            normal_price,
            holiday_price,
          }));
        }
      } catch (error) {
        noti("error", error?.message || "Lỗi");
      } finally {
        reset({
          code,
          normal_price,
          holiday_price,
          menu_ids,
        });

        setOpen(true);
      }
    },
  }));

  //#region Render
  return (
    <CModal
      size="xl"
      show={open}
      onClose={onClose}
      title="Thêm hàng hóa vào menu"
    >
      <div className="p-4 min-w-[800px] flex flex-col gap-3">
        <div className="flex flex-row items-center gap-5 max-w-[700px]">
          <CSelect
            value={currentMenu}
            onChange={onMenuChange}
            options={menu_options ?? []}
            label="Chọn menu"
            className="flex-1"
          />
          <CSelect
            value={priceType}
            onChange={onTypeChange}
            options={PRICE_TYPES_OPTIONS ?? []}
            label="Giá bán"
            className="flex-1"
          />
          <CButton className="self-end btn-fill" onClick={onAdd}>
            Add
          </CButton>
        </div>
        <MenuTable fieldsForm={fieldsForm} onRemove={onRemove} />

        <div className="w-full flex items-center justify-center mt-3 gap-6">
          <CButton className="btn-fill" onClick={onClose}>
            Đóng
          </CButton>
          <CButton className="btn-fill" onClick={onSave}>
            Lưu
          </CButton>
        </div>
      </div>
    </CModal>
  );
  //#endregion
});
