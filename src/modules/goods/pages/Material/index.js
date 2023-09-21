import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";

import Toolbar from "./Toolbar";
import Search from "./Search";
import Table from "./Table";
import Form from "./Form";

import { getAll } from "_common/queries-fn/material.query";
import { create, update, getByCode, remove } from "src/apis/material.api";
import { isSuccess } from "src/utils/funcs";
import { ERROR_MESSAGE } from "src/configs/constant";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const MaterialList = () => {
  const ref = useRef();
  //#region Data
  const isLoading = useSelector(selectIsLoading);

  const [filter, setFilter] = useState({});

  const { data, set, refetch } = getAll(filter, isLoading);

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

    // data return get one is array
    const res = await getByCode(selected[0].code);

    if (res[0]) ref.current.clear(res[0]);
  };

  const onSearch = (where) => {
    setFilter(where);
  };

  const onSave = () => {
    ref.current.handleSubmit(
      async (d) => {
        const func = status === 3 ? update : create;
        const res = await func(d);

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
    const res = await remove(selected.map((c) => c.code));

    if (isSuccess(res)) {
      refetch();
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

export default MaterialList;
