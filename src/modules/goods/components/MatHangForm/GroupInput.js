import { useEffect, useMemo, useState } from "react";
import { Controller, useController, useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { deXuatHangHoaApi } from "src/1/apis/de_xuat_hang_hoa.api";
import {
  C1Upload,
  CInput,
  CSelect,
  CTextarea,
} from "src/common/components/controls";

export const GroupInput = ({ control }) => {
  //#region Data
  const { data: industries } = useQuery({
    queryKey: ["nganh-hang"],
    queryFn: () => deXuatHangHoaApi.getNganhHang(),
    select: (res) =>
      res?.data?.data?.map((e) => ({
        value: e?.code,
        label: e?.name,
        groups: e?.groups?.map((el) => ({ value: el?.code, label: el?.name })),
      })),
  });

  const industryValue = useWatch({ control, name: "industry" });

  const {
    field: { onChange: changeGroup },
  } = useController({ control, name: "group" });

  const groups = useMemo(() => {
    if (industryValue && industryValue?.groups) {
      return industryValue.groups;
    } else {
      return [];
    }
  }, [industryValue]);
  //#endregion

  //#region Event
  const onIndustryChange = (changeCb) => (selectedOption) => {
    changeCb(selectedOption);
    changeGroup(null);
  };
  //#endregion

  //#region Render
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end gap-5">
        <div className="basis-[20%]">
          <Controller
            name="industry"
            control={control}
            render={({ field: { onChange, ..._field } }) => (
              <CSelect
                options={industries ?? []}
                label="Ngành hàng hóa:"
                required
                {..._field}
                onChange={onIndustryChange(onChange)}
              />
            )}
          />
        </div>

        <div className="basis-[20%]">
          <Controller
            name="group"
            control={control}
            render={({ field }) => (
              <CSelect
                options={groups ?? []}
                label="Nhóm hàng hóa:"
                required
                {...field}
              />
            )}
          />
        </div>

        <div className="basis-[20%]">
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <CInput label="Tên hàng hóa" placeholder="Chủ ngữ" {...field} />
            )}
          />
        </div>
        <div className="basis-[20%]">
          <Controller
            name="predicate"
            control={control}
            render={({ field }) => (
              <CInput label="" placeholder="Vị ngữ" {...field} />
            )}
          />
        </div>
        <div className="basis-[20%]">
          <Controller
            name="complement"
            control={control}
            render={({ field }) => (
              <CInput label="" placeholder="Bổ sung" {...field} />
            )}
          />
        </div>
      </div>

      <div className="flex items-start gap-5">
        <div className="basis-[20%]">
          <Controller
            name="code"
            control={control}
            render={({ field }) => (
              <CInput label="Mã hàng hóa" readOnly {...field} />
            )}
          />
        </div>
        <div className="basis-[20%]">
          <Controller
            name="unit"
            control={control}
            render={({ field }) => <CInput label="Đơn Vị Tính" {...field} />}
          />
        </div>
        <div className="basis-[20%]">
          <Controller
            name="standard"
            control={control}
            render={({ field }) => (
              <CInput label="Định mức món cho" {...field} />
            )}
          />
        </div>
        <div className="basis-[20%]">
          <Controller
            name="note"
            control={control}
            render={({ field }) => <CTextarea label="Ghi chú" {...field} />}
          />
        </div>
        <div className="basis-[20%]">
          <Controller
            control={control}
            name="file"
            render={({ field: { ref, ..._field } }) => (
              <C1Upload label="Hình ảnh hàng hóa" required {..._field} />
            )}
          />
        </div>
      </div>
    </div>
  );
  //#endregion
};
