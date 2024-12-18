import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { createSelector } from "reselect";

import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

import {
  approveMaterialSuggest,
  createMaterialSuggest,
  exportExcelMaterialSuggest,
  getMaterialSuggestByCode,
  removeMaterialSuggest,
  updateMaterialSuggest,
} from "src/apis/material_suggest.api";
import { CButton } from "src/common/components/controls";
import { ERROR_MESSAGE } from "src/configs/constant";
import { isSuccess } from "src/utils/funcs";

import { getAllMaterialSuggests } from "_common/queries-fn/material-suggest.query";

import { MPriceSuggest } from "../../components";

import Form from "./Form";
import { formatPayload } from "./func";
import Search from "./Search";
import Table from "./Table";
import Toolbar from "./Toolbar";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const MaterialList = () => {
  const ref = useRef();
  //#region Data
  const isLoading = useSelector(selectIsLoading);

  const modalRef = useRef(null);

  const [filter, setFilter] = useState({});

  const {
    data,
    isLoading: loading,
    set,
    refetch,
  } = getAllMaterialSuggests(filter, isLoading);

  const [status, setStatus] = useState(false);

  const isSelectAll = useMemo(
    () => data?.every((d) => d.check) ?? false,
    [data]
  );

  const selected = useMemo(() => data?.filter((d) => d.check) || [], [data]);
  //#endregion

  //#region Event
  const onSelect = (code, value) =>
    set(
      data.map((d) =>
        code === -1 || d.code === code ? { ...d, check: value } : d
      )
    );

  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onAdd = () => {
    onStatusChange(2);
  };

  const onEdit = async () => {
    onStatusChange(3);

    try {
      const res = await getMaterialSuggestByCode(selected[0].code);

      if (res?.data) ref.current.clear(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const refetchDetail = async () => {
    try {
      const res = await getMaterialSuggestByCode(selected[0].code);

      if (res?.data) ref.current.clear(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (where) => {
    setFilter(where);
  };

  const onSave = () => {
    ref.current.handleSubmit(async (d) => {
      const _payload = formatPayload(d);

      const func = status === 3 ? updateMaterialSuggest : createMaterialSuggest;
      const res = await func(_payload);

      if (isSuccess(res)) {
        refetch();
        setStatus(0);
        ref.current.clear();
        noti("success", "Thành công");
      } else {
        noti("error", ERROR_MESSAGE.NVL.REQUIRED);
      }
    })();
  };

  const onRemove = async () => {
    const res = await removeMaterialSuggest(selected.map((c) => c.code));

    if (isSuccess(res)) {
      refetch();
    }
  };

  const onExport = () => {
    exportExcelMaterialSuggest(filter);
  };

  const onSuggest = () => {
    modalRef.current?.open();
  };

  const onApprove = async () => {
    try {
      const code = selected[0]?.code;

      await approveMaterialSuggest(code);

      refetch();
      setStatus(0);
      ref.current.clear();
      noti("success", "Thành công");
    } catch (error) {
      console.log(error);
    }
  };
  //#endregion

  useEffect(() => {
    if (selected.length !== 1 && status === 3) setStatus(0);
  }, [selected]);

  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            status={status}
            selectedNo={selected.length}
            canSave={status}
            onAdd={onAdd}
            onEdit={onEdit}
            onRemove={onRemove}
            onSave={onSave}
            onExport={onExport}
            CustomFeatures={
              status ? (
                <>
                  <CButton className="btn-danger" onClick={() => {}}>
                    Từ chối
                  </CButton>
                  <CButton className="btn-primary" onClick={onApprove}>
                    Duyệt
                  </CButton>
                </>
              ) : (
                <>
                  <CButton
                    className="btn-primary"
                    disabled={!(selected?.length === 1 && status !== 2)}
                    onClick={onSuggest}
                  >
                    Đề Xuất Giá
                  </CButton>
                </>
              )
            }
          />
        </CCardBody>
      </CCard>

      <CRow>
        <CCol
          xs="12"
          sm="12"
          md={status > 1 ? 5 : 12}
          lg={status > 1 ? 5 : 12}
          xl={status > 1 ? 5 : 12}
          className={classNames(status && "d-none")}
        >
          <CCard>
            <CCardHeader>
              <Search onSearch={onSearch} />
            </CCardHeader>
            <CCardBody className="px-0 pt-0">
              <Table
                onSelect={onSelect}
                isSelectAll={isSelectAll}
                data={data}
                loading={loading}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" className={classNames(!status && "d-none")}>
          <CCard>
            <CCardBody className="bg-light-blue">
              <Form isEdit={status === 3} ref={ref} refetch={refetchDetail} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <MPriceSuggest ref={modalRef} code={selected?.[0]?.code} />
    </>
  );
};

export default MaterialList;
