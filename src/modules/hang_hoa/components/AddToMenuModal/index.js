import { CModal } from "@coreui/react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { menuApi } from "src/1/apis/menu.api";
import { CButton, CSelect } from "src/common/components/controls";
import { PRICE_TYPES_OPTIONS } from "src/modules/menu/constants";
import { MenuTable } from "./MenuTable";

export const AddToMenuModal = forwardRef((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const [isHoliday, setIsHoliday] = useState("normal");
  const [currentMenu, setCurrentMenu] = useState(null);

  const { control, reset, handleSubmit } = useForm({
    mode: "all",
    defaultValues: { menu_ids: [] },
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
    setOpen(false);
  };
  //#endregion

  useEffect(() => {
    if (menu_options && menu_options?.length > 0) {
      setCurrentMenu(menu_options[0]);
    }
  }, [menu_options]);

  useImperativeHandle(ref, () => ({
    open: () => setOpen(true),
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
            options={menu_options ?? []}
            label="Chọn menu"
            className="flex-1"
          />
          <CSelect
            value={isHoliday}
            options={PRICE_TYPES_OPTIONS ?? []}
            label="Giá bán"
            className="flex-1"
          />
          <CButton className="self-end">Add</CButton>
        </div>
        <MenuTable control={control} />
      </div>
    </CModal>
  );
  //#endregion
});
