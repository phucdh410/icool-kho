import { useEffect, useMemo } from "react";
import { Controller, useController, useWatch } from "react-hook-form";
import { useQuery } from "react-query";
import { deXuatHangHoaApi } from "src/1/apis/de_xuat_hang_hoa.api";
import { nganhHangHoaApi } from "src/1/apis/nganh_hang_hoa.api";
import { nhomHangHoaApi } from "src/1/apis/nhom_hang_hoa.api";
import {
  C1Upload,
  CInput,
  CSelect,
  CTextarea,
} from "src/common/components/controls";

export const GroupInput = ({ control, isEdit }) => {
  //#region Data
  const industry_code = useWatch({ control, name: "industry_code" });
  const group_id = useWatch({ control, name: "group_id" });

  const { data: industries } = useQuery({
    queryKey: ["nganh-hang"],
    queryFn: () => nganhHangHoaApi.getAll({ status: 1 }),
    select: (res) =>
      res?.data?.data?.map((e) => ({
        value: e?.code,
        label: e?.name,
        acronym: e?.acronym,
      })),
  });

  const { data: groups } = useQuery({
    queryKey: ["nhom-hang", industry_code],
    queryFn: () => nhomHangHoaApi.getAll({ status: 1, industry_code }),
    enabled: !!industry_code,
    select: (response) =>
      response?.data?.data?.map((e) => ({
        value: e?.code,
        label: e?.name,
        acronym: e?.acronym,
      })),
  });

  const {
    field: { onChange: changeGroup },
  } = useController({ control, name: "group_id" });

  const {
    field: { onChange: onCodeChange },
  } = useController({ control, name: "code" });
  //#endregion

  //#region Event
  const onIndustryChange = (changeCb) => (selectedOption) => {
    changeCb(selectedOption);
    changeGroup(null);
  };
  //#endregion

  useEffect(() => {
    if (isEdit) return;

    let result = "";

    if (industry_code) {
      if (group_id) {
        result = industry_code?.acronym + "." + group_id?.acronym;
      } else {
        result = industry_code?.acronym;
      }
    }
    onCodeChange(result);
  }, [isEdit, industry_code, group_id]);

  //#region Render
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end gap-5">
        <div className="basis-[20%]">
          <Controller
            name="industry_code"
            control={control}
            render={({ field: { onChange, ..._field } }) =>
              isEdit ? (
                <CInput label="Ngành hàng hóa:" disabled required {..._field} />
              ) : (
                <CSelect
                  options={industries ?? []}
                  label="Ngành hàng hóa:"
                  required
                  {..._field}
                  onChange={onIndustryChange(onChange)}
                />
              )
            }
          />
        </div>

        <div className="basis-[20%]">
          {isEdit ? (
            <Controller
              name="group_name"
              control={control}
              render={({ field }) => (
                <CInput label="Nhóm hàng hóa:" disabled required {...field} />
              )}
            />
          ) : (
            <Controller
              name="group_id"
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
          )}
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
              <CInput label="Mã hàng hóa" disabled {...field} />
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
