import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useMutation } from "react-query";

import { CCard, CCardBody, CSpinner } from "@coreui/react";

import { correctQuantity } from "src/apis/purchase_proposal_form.api";
import { isSuccess } from "src/utils/funcs";

import { CButton, CDate } from "_components/controls";
import { CDialog } from "_components/others";

export default forwardRef(({ onSuccess }, ref) => {
  const mutation = useMutation(({ store_code, date }) =>
    correctQuantity({ store_code, date })
  );
  //#region
  const [code, setCode] = useState();

  const [date, setDate] = useState(new Date());
  //#endregion

  //#region
  const onChange = (_date) => setDate(_date);

  const onSubmit = async () => {
    const res = await mutation.mutateAsync({
      store_code: code,
      date: date,
    });

    if (isSuccess(res)) {
      onSuccess(res.data);
      setCode(null);
    }
  };

  const onClose = () => setCode(null);
  //#endregion

  useImperativeHandle(ref, () => ({ set: (_code) => setCode(_code) }), []);

  useEffect(() => !code && setDate(null), [code]);

  //#region
  return (
    <CDialog size="sm" className="m-auto" show={!!code} onClose={onClose}>
      <CCard>
        <CCardBody className="px-0">
          <div>
            <CDate
              value={date}
              maxDate={Date.now()}
              className="mx-auto inline"
              onChange={onChange}
              inline
            />
          </div>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody className="p-0">
          <CButton
            className="w-100"
            onClick={onSubmit}
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? (
              <CSpinner size="sm" className="text-center" color="primary" />
            ) : (
              "Xác nhận"
            )}
          </CButton>
        </CCardBody>
      </CCard>
    </CDialog>
  );
  //#endregion
});
