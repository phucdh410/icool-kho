import React from "react";

import { useForm, Controller } from "react-hook-form";

import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";
import { CInput, CButton } from "_components/controls";

export default function ({ user }) {
  //#region Datas
  const { handleSubmit, control, setValue } = useForm();
  //#endregion

  //#region Events
  const submit = () => {
    handleSubmit(
      (d) => {},
      (e) => noti("error", e)
    )();
  };
  //#endregion

  //#region Render
  return (
    <CCard className="pt-4 profile-update">
      <CCardHeader className="px-5 border-0 bg-light-blue d-flex justify-content-between align-center align-items-center">
        <h4 className="my-0 text-icool-blue text-uppercase font-weight-bold">
          Đổi mật khẩu
        </h4>
        <CButton color="primary" className="btn-sm btn-fill" onClick={submit}>
          Cập nhật mật khẩu
        </CButton>
      </CCardHeader>
      <CCardBody className="px-5">
        <CRow>
          <CCol xs="12" sm="6" lg="3">
            <CInput value={user.username} label="Tên tài khoản" disabled />
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <Controller
              name="oPassword"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <CInput
                  name="oPassword"
                  type="password"
                  {...field}
                  label="Mật khẩu cũ"
                  required
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <Controller
              name="nPassword"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <CInput
                  name="nPassword"
                  type="password"
                  {...field}
                  label="Mật khẩu mới"
                  required
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="6" lg="3">
            <Controller
              name="cPassword"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <CInput
                  name="cPassword"
                  type="password"
                  {...field}
                  label="Nhập lại mật khẩu mới"
                  required
                />
              )}
            />
          </CCol>
          <CCol xs="12" sm="12" style={{ fontSize: "15px" }}>
            &#40;<span className="text-danger">*</span>&#41; Là các trường bắt
            buộc
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
  //#endregion
}
