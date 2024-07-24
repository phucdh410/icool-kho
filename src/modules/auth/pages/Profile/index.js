import { useCallback,useEffect, useRef, useState } from "react";
import { Controller,useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { CCard, CCardBody, CCardHeader,CCol, CImg, CRow } from "@coreui/react";

import { CButton,CDate, CInput, CSelect } from "_components/controls";

import MChangePassword from "./ChangePassword";

import "../../assets/css/profile.scss";

const Profile = () => {
  //#region Datas
  const input = useRef();
  const avatar = useRef();
  const user = useSelector((state) => state.auth.user);

  const { handleSubmit, control, setValue } = useForm();

  const [show, setShow] = useState(false);
  //#endregion

  //#region Events
  const uploadImage = useCallback(() => input.current.click(), []);

  const setForm = useCallback((user) => {
    avatar.current.src = user.avatar;
    Object.keys(user).forEach((k) => setValue(k, user[k]));
  }, []);

  const onImageUpload = useCallback((e) => {
    const file = e.target.files[0];
    avatar.current.src = URL.createObjectURL(file);
    setValue("avatar", file);
  }, []);

  const onSubmit = useCallback(() => {
    setShow(false);
    handleSubmit(
      (d) => {},
      (e) => noti("error", e)
    )();
  }, []);
  const onCancel = useCallback(() => {
    setShow(false), setForm(user);
  }, []);
  //#endregion

  useEffect(() => user && setForm(user), [user]);

  //#region Render
  return (
    <>
      <CCard className="pt-4 profile-info">
        <CCardHeader className="px-5 border-0 bg-light-blue d-flex justify-content-between align-items-center">
          <h4 className="my-0 text-icool-blue text-uppercase font-weight-bold">
            Thông tin cá nhân
          </h4>
          {show ? (
            <>
              <div>
                <CButton
                  color="primary"
                  className="btn-sm btn-fill mr-4"
                  onClick={onSubmit}
                >
                  Cập nhật
                </CButton>
                <CButton
                  color="danger"
                  className="btn-sm btn-fill"
                  onClick={onCancel}
                >
                  Hủy
                </CButton>
              </div>
            </>
          ) : (
            <CButton
              color="primary"
              className="btn-sm btn-fill"
              onClick={() => setShow(!show)}
            >
              Cập nhật thông tin
            </CButton>
          )}
        </CCardHeader>
        <CCardBody className="pt-5 px-5">
          <CRow>
            <CCol xs="12" lg="3" className="mb-5 mb-lg-0">
              <div
                className="m-auto m-lg-0 avatar"
                style={{ maxWidth: "350px" }}
              >
                <div className="c-avatar">
                  <CImg
                    innerRef={avatar}
                    src="/avatars/6.jpg"
                    alt={user?.email}
                    className="c-avatar-img"
                    draggable="false"
                  />
                </div>
                {show && (
                  <div className="btn" onClick={uploadImage}>
                    <Camera />
                    <input
                      ref={input}
                      type="file"
                      accept="image/*"
                      onChange={onImageUpload}
                      style={{ display: "none" }}
                    />
                  </div>
                )}
              </div>
            </CCol>
            <CCol xs="12" lg="9" className="pl-5">
              <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
                <CRow>
                  <CCol xs="12">
                    <h2 className="text-icool-blue text-uppercase font-weight-bold">
                      {user?.name || "NGUYỄN MINH THẢO"}
                    </h2>
                  </CCol>
                  <CCol xs="12" className="mb-4 text-black font-italic">
                    <b style={{ fontSize: "16px" }}>
                      {user?.roleName || "Nhân sự"} -{" "}
                      {user?.storeName || "ICOOL Trần não"}
                    </b>
                  </CCol>
                  <CCol xs="12" sm="6" md="4" lg="3">
                    <Controller
                      name="name"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CInput
                          name="name"
                          {...field}
                          label="Họ và tên"
                          readOnly={!show}
                        />
                      )}
                    />
                  </CCol>
                  <CCol xs="12" sm="6" md="4" lg="3">
                    <Controller
                      name="birthday"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CDate
                          name="birthday"
                          {...field}
                          label="Ngày sinh"
                          readOnly={!show}
                        />
                      )}
                    />
                  </CCol>
                  <CCol xs="12" sm="6" md="4" lg="3">
                    <Controller
                      name="gender"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CSelect
                          name="gender"
                          options={[
                            { data: "", value: "0", label: "Nam" },
                            { data: "", value: "1", label: "Nữ" },
                          ]}
                          {...field}
                          label="Giới tính"
                          readOnly={!show}
                        />
                      )}
                    />
                  </CCol>
                  <CCol xs="12" sm="6" md="4" lg="3">
                    <Controller
                      name="born"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CSelect
                          options={[{ data: "", value: "1", label: "HCM" }]}
                          name="born"
                          {...field}
                          label="Nơi sinh"
                          readOnly={!show}
                        />
                      )}
                    />
                  </CCol>
                  <CCol xs="12" sm="6" md="4" lg="3">
                    <Controller
                      name="mobile"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CInput
                          name="mobile"
                          {...field}
                          label="Số điện thoại"
                          readOnly={!show}
                        />
                      )}
                    />
                  </CCol>
                  <CCol xs="12" sm="12" lg="9">
                    <Controller
                      name="address"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <CInput
                          name="address"
                          {...field}
                          label="Địa chỉ"
                          autoComplete="off"
                          readOnly={!show}
                        />
                      )}
                    />
                  </CCol>
                  <CCol xs="12" sm="6" md="4" lg="3">
                    <CInput label="Mã nhân viên" value={user.code} readOnly />
                  </CCol>
                  <CCol xs="12" sm="6" md="4" lg="3">
                    <CInput label="Chi nhánh" value={user.storeName} readOnly />
                  </CCol>
                  <CCol xs="12" sm="6" md="4" lg="3">
                    <CInput label="Vị trí" value={user.roleName} readOnly />
                  </CCol>
                </CRow>
              </form>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <MChangePassword user={user} />
    </>
  );
  //#endregion
};

export default Profile;
