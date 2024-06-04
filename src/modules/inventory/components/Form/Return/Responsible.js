import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import { Controller, useForm } from "react-hook-form";

import { CCard, CCardBody, CRow, CCol } from "@coreui/react";

import { CDialog } from "src/common/components/others";
import { CButton, CTextarea, CSelect } from "src/common/components/controls";

import { getResponsible } from "../../../queries-fn/responsible.query";
import { approve } from "src/apis/cancellation_slip.api";
import { CENTRAL_WAREHOUSE, ERROR_MESSAGE } from "src/configs/constant";

const initial = {
  responsible: "",
  reason: "",
};

export default forwardRef(({ code, store, onResponsible }, ref) => {
  //#region Data

  const { data: responsible } = getResponsible(store, !store);

  const [materialCodes, setCodes] = useState(null);

  const { control, setValue, reset, handleSubmit } = useForm({
    defaultValues: initial,
  });
  //#endregion

  //#region Events
  const onSave = handleSubmit(
    async (d) => {
      const res = await approve({
        ...d,
        materials: materialCodes,
        approvedStatus: 1,
        responsible: d.responsible === CENTRAL_WAREHOUSE ? 2 : 1,
      });

      if (res.exitcode === 200) {
        onResponsible(res.data.reason, res.data.responsible);
        onClose();
      }
    },
    (e) => {
      if (e["responsible"])
        noti("error", ERROR_MESSAGE.INVENTORY_CANCEL.RESPONSIBLE_REQUIRED);
    }
  );

  const onClose = () => {
    setCodes(null);
    reset({ code, ...initial });
  };

  const selectResposible = useCallback(({ value }) => {
    setValue("responsible", value);
  }, []);
  //#endregion

  useImperativeHandle(ref, () => ({ setCodes }), []);

  useEffect(() => code && setValue("code", code), [code]);

  //region Render
  return (
    <CDialog show={!!materialCodes} size="" onClose={onClose}>
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xs="12">
              <Controller
                control={control}
                name="responsible"
                rules={{ required: true }}
                render={({ field }) => (
                  <CSelect
                    label="Bộ phận chịu trách nhiệm"
                    menuPortalTarget={null}
                    options={responsible}
                    {...field}
                    onChange={selectResposible}
                  />
                )}
              />
            </CCol>
            <CCol xs="12">
              <Controller
                control={control}
                name="reason"
                render={({ field }) => (
                  <CTextarea size="4" rows="4" label="Lý do" {...field} />
                )}
              />
            </CCol>
            <CCol xs="12">
              <div className="text-center">
                <CButton className="btn-fill" onClick={onSave}>
                  Lưu
                </CButton>
              </div>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CDialog>
  );
  //#endregion
});
