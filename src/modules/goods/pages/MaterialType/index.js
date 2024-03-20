import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";

import Toolbar from "./Toolbar";
import Search from "./Search";
import Table from "./Table";
import Form from "./Form";

import { getAllMaterialTypes } from "_common/queries-fn/material-type.query";
import {
  createMaterialType,
  exportExcelMaterialType,
  removeMaterialType,
  updateMaterialType,
} from "src/apis/material_type.api";
import classNames from "classnames";
import { isSuccess } from "src/utils/funcs";
import { ERROR_MESSAGE } from "src/configs/constant";
import { useQuery } from "react-query";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const MaterialType = () => {
  const ref = useRef();
  //#region Data
  const isLoading = useSelector(selectIsLoading);

  const [status, setStatus] = useState(0);

  const [filter, setFilter] = useState({});

  const {
    data,
    isLoading: loading,
    refetch,
    set,
  } = getAllMaterialTypes(filter, isLoading);

  const isSelectAll = useMemo(
    () => data?.every((d) => d.check) ?? false,
    [data]
  );

  const selected = useMemo(() => data?.filter((d) => d.check) || [], [data]);
  //#endregion

  //#region Events
  const onSelect = (code, value) =>
    set(
      data && data?.length > 0
        ? data.map((d) =>
            code === -1 || d.code === code ? { ...d, check: value } : d
          )
        : []
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
        active: !!selected[0]?.active,
        acronym: selected[0]?.acronym,
        note: selected[0]?.note,
        materialGroupCode: selected[0]?.materialGroupCode,
        materialGroupName: selected[0]?.materialGroupCode,
      };

      ref.current.clear(editData);
    }
  };

  const onSearch = (where) => {
    setFilter(where);
  };

  const onSave = () => {
    ref.current.handleSubmit(
      async (d) => {
        const { active, ..._params } = d;
        _params.active = Number(active) || 0;

        const func = status === 3 ? updateMaterialType : createMaterialType;
        const res = await func(_params);

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
    const res = await removeMaterialType(selected.map((c) => c.code));

    if (isSuccess(res)) {
      refetch();
    }
  };

  const onExport = () => {
    exportExcelMaterialType(filter);
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

export default MaterialType;
