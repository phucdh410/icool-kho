import { useCallback, useMemo,useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { approve,remove } from "src/apis/export_slip.api";
import { history } from "src/App";
import { setFilter } from "src/common/actions/config.action";
import { fireDelete, fireSuccess } from "src/utils/alert";
import { isSuccess } from "src/utils/funcs";

import { getAll } from "_common/queries-fn/export.query";

import { NAME } from "../../reducers/export";

import Table from "./Table";
import Toolbar from "./Toolbar";

const selectIsLoading = createSelector(
  (state) => state.config,
  (state) => state.export,
  ({ isLoading }, { filters }) => ({ isLoading, filters })
);

const ExportList = () => {
  const dispatch = useDispatch();
  //#region Data
  const { isLoading, filters } = useSelector(selectIsLoading);

  const [isFetching, setFetching] = useState(false);

  const [status, setStatus] = useState(0);

  const { data, set, refetch } = getAll(filters, isLoading, {
    onSuccess: () => setFetching(false),
  });

  const isSelectAll = useMemo(
    () => data?.every((d) => d.approvedStatus || d.check),
    [data]
  );

  const selected = useMemo(
    () =>
      isFetching ? [] : data?.filter((d) => !d.approvedStatus && d.check) || [],
    [data, isFetching]
  );
  //#endregion

  //#region Event
  const select = useCallback(
    (code, v) =>
      set(
        data?.map((d) =>
          !d.approvedStatus && (code === -1 || d.code === code)
            ? { ...d, check: v }
            : d
        )
      ),
    [data]
  );

  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onSearch = useCallback(
    (data) => dispatch(setFilter(NAME, data)),
    [dispatch]
  );

  const onEdit = useCallback(() => {
    if (selected.length === 1) history.push(`/export/form/${selected[0].code}`);
  });

  const onApprove = useCallback(async () => {
    setFetching(true);
    const res = await approve({ code: selected.map((s) => s.code), status });

    if (isSuccess(res)) {
      noti("success", res.message);
      refetch();
    } else {
      setFetching(false);
      noti("error", res.message);
    }
  });

  const onRemove = useCallback(async () => {
    const allow = await fireDelete();
    if (allow) {
      const res = await remove(selected.map((s) => s.code));

      if (res.exitcode == 200) {
        refetch();
        fireSuccess();
      } else {
        fireError();
      }
    }
  }, [selected, refetch]);

  //#endregion

  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            filter={filters}
            status={status}
            selectedNo={selected.length}
            toggleStatus={onStatusChange}
            onSearch={onSearch}
            onApprove={onApprove}
            onEdit={onEdit}
            onRemove={onRemove}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody className="px-0 pt-0">
          <Table
            loading={isLoading}
            isSelectAll={isSelectAll}
            data={data}
            onSelect={select}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default ExportList;
