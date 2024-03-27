import styles from "../../assets/material.module.scss";

import React, { forwardRef, useImperativeHandle, useMemo } from "react";

import classNames from "classnames";

import { Controller, useForm } from "react-hook-form";

import { CRow, CCol, CCard, CCardBody } from "@coreui/react";

import { CInput, CCheckbox, CSelect, CNumber } from "_components/controls";

import { DATE_MANAGEMENT_OPTIONS } from "src/configs/constant";

import { useQuery } from "react-query";
import { getConfigs } from "src/apis/config.api";
import {
  GroupInput,
  IndustryInput,
  TypeInput,
  CodeMaterialInput,
  NameMaterialInput,
  FormTable,
} from "./Inputs";

export default forwardRef(({ isEdit = false }, ref) => {
  //#region Data
  const { control, reset, watch, handleSubmit } = useForm();

  const { data: response } = useQuery({
    queryKey: ["configs"],
    queryFn: () => getConfigs(),
  });

  const locations = useMemo(
    () =>
      response?.data?.material_location.map((e) => ({
        value: e?.key,
        label: e?.label,
        acronym: e.acronym,
      })) || [],
    [response]
  );
  //#endregion

  useImperativeHandle(
    ref,
    () => ({
      handleSubmit,
      clear: (data = {}) => reset(data),
    }),
    []
  );

  //#region Render
  return (
    <>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xs="12">
              <h5 className="text-icool-blue text-uppercase">
                Mã nguyên vật liệu
              </h5>
            </CCol>
            <CCol xs="12">
              <CRow>
                <CCol style={{ minWidth: 250 }}>
                  <IndustryInput control={control} />
                </CCol>
                <CCol>
                  <GroupInput control={control} />
                </CCol>
                <CCol>
                  <TypeInput control={control} />
                </CCol>
                <CCol>
                  <Controller
                    control={control}
                    name="materialLocation"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CSelect
                        label="Vị trí NVL"
                        options={locations}
                        {...field}
                        required
                      />
                    )}
                  />
                </CCol>
                <CCol>
                  <Controller
                    control={control}
                    name="expired"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CSelect
                        label="Quản lý date"
                        options={DATE_MANAGEMENT_OPTIONS}
                        {...field}
                        required
                      />
                    )}
                  />
                </CCol>
              </CRow>
              <CRow style={{ marginTop: "10px" }}>
                <CCol xs="4">
                  <CodeMaterialInput control={control} />
                  <i style={{ color: "red", fontWeight: 500, fontSize: 16 }}>
                    *Số 0001 chỉ là ví dụ, số mã NVL sẽ được tạo tự động khi lưu
                    vào hệ thống
                  </i>
                </CCol>
                <CCol xs="2">
                  <Controller
                    control={control}
                    name="time"
                    render={({ field }) => (
                      <CNumber label="Thời gian (Ngày)" {...field} />
                    )}
                  />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody>
          <CRow>
            <CCol xs="12">
              <h5 className="text-icool-blue text-uppercase">
                Tên nguyên vật liệu
              </h5>
            </CCol>
            <CCol xs="12">
              <CRow>
                <CCol>
                  <Controller
                    control={control}
                    name="subject"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CInput label="Chủ Ngữ" {...field} required />
                    )}
                  />
                </CCol>
                <CCol>
                  <Controller
                    control={control}
                    name="predicate"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CInput label="Vị Ngữ" required {...field} />
                    )}
                  />
                </CCol>
                <CCol>
                  <Controller
                    control={control}
                    name="complement"
                    rules={{ required: true }}
                    render={({ field }) => (
                      <CInput label="Bổ Ngữ" required {...field} />
                    )}
                  />
                </CCol>
              </CRow>
              <CRow style={{ marginTop: "10px" }}>
                <CCol xs="4">
                  <NameMaterialInput control={control} />
                </CCol>
                <CCol xs="4">
                  <Controller
                    control={control}
                    name="note"
                    render={({ field }) => (
                      <CInput label="Ghi chú" {...field} />
                    )}
                  />
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <div
        className={classNames(styles["checkbox_group"])}
        style={{ marginBlock: "16px" }}
      >
        <div className="mr-4">
          <Controller
            name="stop"
            control={control}
            render={({ field }) => (
              <CCheckbox
                label="Ngưng cung cấp"
                className="text-black font-weight-bold"
                disabled={!isEdit}
                {...field}
              />
            )}
          ></Controller>
        </div>
        <div className="mr-4">
          <Controller
            name="allow"
            control={control}
            render={({ field }) => (
              <CCheckbox
                label="Cho phép chi nhánh nhập hàng"
                className="text-black font-weight-bold"
                {...field}
              />
            )}
          />
        </div>
        <div className="mr-4">
          <Controller
            name="allow_central"
            control={control}
            render={({ field }) => (
              <CCheckbox
                label="Nhập về bếp trung tâm"
                className="text-black font-weight-bold"
                {...field}
              />
            )}
          />
        </div>
      </div>

      <CCard>
        <CCardBody>
          <CRow>
            <CCol xs="12">
              <h5 className="text-icool-blue text-uppercase">Quy đổi</h5>
            </CCol>
            <CCol xs="12">
              <CRow>
                <CCol
                  xl="6"
                  style={{ order: 1 }}
                  className={classNames(styles["unit"])}
                >
                  <label className="font-weight-bold">
                    Đơn vị công thức <span className="text-danger">*</span> :
                  </label>
                  <div className="form">
                    <Controller
                      control={control}
                      name="formulaUnit"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CInput className="w-100" required {...field} />
                      )}
                    />
                  </div>
                </CCol>
                <CCol
                  xl="6"
                  style={{ order: 3 }}
                  className={classNames(styles["unit"], styles["exchange"])}
                >
                  <label className="font-weight-bold">
                    Đơn vị lưu kho <span className="text-danger">*</span> :
                  </label>
                  <div className={classNames(styles["form"])}>
                    <Controller
                      control={control}
                      name="wareUnit"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CInput
                          required
                          {...field}
                          style={{ justifySelf: "start" }}
                        />
                      )}
                    />
                    <div className={classNames(styles["equal_sign"])}>
                      <span> = </span>
                    </div>
                    <Controller
                      control={control}
                      name="wareEx"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CNumber
                          className={styles["exchange_value"]}
                          required
                          {...field}
                        />
                      )}
                    />
                    <CInput
                      readOnly
                      className={styles["exchange_to"]}
                      placeholder="(Theo DVCT)"
                      tabIndex="-1"
                      value={watch("unit")}
                    />
                  </div>
                </CCol>
                <CCol
                  xl="6"
                  style={{ order: 2 }}
                  className={classNames(styles["unit"], styles["exchange"])}
                >
                  <label className="font-weight-bold">
                    Đơn vị mua hàng <span className="text-danger">*</span> :
                  </label>
                  <div className={classNames(styles["form"])}>
                    <Controller
                      control={control}
                      name="boughtUnit"
                      rules={{ required: true }}
                      render={({ field }) => <CInput required {...field} />}
                    />
                    <div className={classNames(styles["equal_sign"])}>
                      <span> = </span>
                    </div>
                    <Controller
                      control={control}
                      name="boughtEx"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CNumber
                          className={styles["exchange_value"]}
                          required
                          {...field}
                        />
                      )}
                    />
                    <CInput
                      readOnly
                      className={styles["exchange_to"]}
                      placeholder="(Theo ĐVLK)"
                      tabIndex="-1"
                      value={watch("wareUnit")}
                    />
                  </div>
                </CCol>
                <CCol
                  xl="6"
                  style={{ order: 4 }}
                  className={classNames(styles["unit"], styles["exchange"])}
                >
                  <label className="font-weight-bold">
                    Đơn vị NCC <span className="text-danger">*</span> :
                  </label>
                  <div className={classNames(styles["form"])}>
                    <Controller
                      control={control}
                      name="providerUnit"
                      className={styles["exchange_to"]}
                      rules={{ required: true }}
                      render={({ field }) => <CInput required {...field} />}
                    />
                    <div className={classNames(styles["equal_sign"])}>
                      <span> = </span>
                    </div>
                    <Controller
                      control={control}
                      name="providerEx"
                      rules={{ required: true }}
                      render={({ field }) => (
                        <CNumber
                          className={styles["exchange_value"]}
                          required
                          {...field}
                        />
                      )}
                    />
                    <CInput
                      readOnly
                      placeholder="(Theo ĐVMH)"
                      className={styles["exchange_to"]}
                      tabIndex="-1"
                      value={watch("boughtUnit")}
                    />
                  </div>
                </CCol>
              </CRow>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      <CCard style={{ marginBottom: "100px" }}>
        <CCardBody>
          <CRow>
            <CCol xs="12" md="8" lg="7" xl="6" xxl="5">
              <FormTable control={control} />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>

      {/* <CRow>
        <CCol
          xs="12"
          className="d-flex justify-content-between"
          style={{ alignItems: "flex-end" }}
        >
          <label className="text-black font-weight-bold">
            NCC nhiệm giao hàng:
          </label>
          <div style={{ width: "70%" }}>
            <CSelect className="m-0" />
          </div>
        </CCol>
      </CRow> */}
    </>
  );
  //#endregion
});
