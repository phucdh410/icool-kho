import { useCallback, useEffect,useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { createSelector } from "reselect";

import { CCard, CCardBody, CCardHeader,CCol, CRow } from "@coreui/react";

import {
  create,
  exportExcel,
  remove,
  update,
} from "src/apis/material_industry.api";
import { ERROR_MESSAGE } from "src/configs/constant";
import { isSuccess } from "src/utils/funcs";

import { getAll } from "_common/queries-fn/material-industry.query";

import Form from "./Form";
import Search from "./Search";
import Table from "./Table";
import Toolbar from "./Toolbar";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const MaterialIndustryList = () => {
  const ref = useRef();
  //#region Data
  const isLoading = useSelector(selectIsLoading);

  const [status, setStatus] = useState(0);

  const [filter, setFilter] = useState({});

  const { data, isLoading: loading, refetch, set } = getAll(filter, isLoading);

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

    if (selected[0]) {
      const editData = {
        code: selected[0]?.code,
        name: selected[0]?.name,
        status: !!selected[0]?.status,
        acronym: selected[0]?.acronym,
        note: selected[0]?.note,
      };

      ref.current.clear(editData);
    }
  };

  const onSearch = (where) => {
    setFilter(where);
  };

  const onSave = () => {
    ref.current.handleSubmit(
      async (values) => {
        const body = { ...values, status: Number(values?.status) };

        let res = null;

        if (status === 3) {
          res = await update(selected[0]?.id, body);
        } else {
          res = await create(body);
        }

        if (isSuccess(res)) {
          refetch();
          setStatus(0);
          ref.current.clear();
          noti("success", "Thành công");
        } else {
          noti("error", ERROR_MESSAGE.NVL.REQUIRED);
        }
      },
      (e) => {}
    )();
  };

  const onRemove = async () => {
    const res = await remove(selected[0]?.id);

    if (isSuccess(res)) {
      refetch();
    }
  };

  const onExport = () => {
    exportExcel(filter);
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
        <CCol
          xs="12"
          sm="12"
          md={status > 1 && 7}
          lg={status > 1 && 7}
          xl={status > 1 && 7}
          className={classNames(!status && "d-none")}
        >
          <CCard>
            <CCardBody className="bg-light-blue">
              <Form ref={ref} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default MaterialIndustryList;
