import { CCol, CRow } from "@coreui/react";
import { Controller } from "react-hook-form";
import {
  CDate,
  CInput,
  CSelect,
  CTextarea,
} from "src/common/components/controls";
import { CActionGroup } from "src/common/components/others";
import { KY_DANH_GIA_OPTIONS, YEAR_OPTIONS } from "../../constants";

export const FormToolbar = ({ control }) => {
  //#region Event
  const onClick = (keyAction) => {
    console.log("🚀 ~ onClick ~ keyAction:", keyAction);
  };
  //#endregion

  //#region Render
  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup onClick={onClick} canSave hideEditBtn />
          </div>
        </CCol>
      </CRow>

      <div className="flex items-center gap-4 mt-4">
        <Controller
          control={control}
          name="code"
          render={({ field }) => (
            <CInput
              {...field}
              className="flex-1 max-w-[250px]"
              label="Số phiếu"
              readOnly
            />
          )}
        />
        <Controller
          control={control}
          name="ky_danh_gia"
          render={({ field }) => (
            <CSelect
              {...field}
              className="flex-1 max-w-[150px]"
              label="Kỳ đánh giá"
              options={KY_DANH_GIA_OPTIONS ?? []}
            />
          )}
        />
        <Controller
          control={control}
          name="year"
          render={({ field }) => (
            <CSelect
              {...field}
              className="flex-1 max-w-[150px]"
              label="Năm"
              options={YEAR_OPTIONS ?? []}
            />
          )}
        />
        <Controller
          control={control}
          name="date"
          render={({ field }) => (
            <CDate
              {...field}
              className="flex-1 max-w-[200px]"
              label="Ngày đánh giá"
            />
          )}
        />
        <Controller
          control={control}
          name="note"
          render={({ field }) => (
            <CInput {...field} className="flex-1" label="Ghi chú" />
          )}
        />
      </div>
    </>
  );
  //#endregion
};
