import { Controller } from "react-hook-form";

import { CCard, CCardBody } from "@coreui/react";

import {
  CDate,
  CFile,
  CInput,
  CTextarea,
} from "src/common/components/controls";

export const Info = ({ control }) => {
  return (
    <CCard>
      <CCardBody>
        <div className="grid grid-cols-3 gap-4">
          <Controller
            control={control}
            name="code"
            render={({ field }) => (
              <CInput {...field} label="Mã Combo" required readOnly />
            )}
          />
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <CInput {...field} label="Tên Combo" required />
            )}
          />
          <Controller
            control={control}
            name="note"
            render={({ field }) => <CTextarea {...field} label="Ghi chú" />}
          />
          <Controller
            control={control}
            name="unit"
            render={({ field }) => (
              <CInput {...field} label="Đơn vị tính" required />
            )}
          />
          <Controller
            control={control}
            name="files"
            render={({ field }) => (
              <CFile {...field} label="Hình ảnh combo" required />
            )}
          />
          <Controller
            control={control}
            name="start"
            render={({ field }) => (
              <CDate {...field} label="Áp dụng từ ngày" required />
            )}
          />
          <Controller
            control={control}
            name="end"
            render={({ field }) => (
              <CDate {...field} label="Đến ngày" required />
            )}
          />
        </div>
      </CCardBody>
    </CCard>
  );
};