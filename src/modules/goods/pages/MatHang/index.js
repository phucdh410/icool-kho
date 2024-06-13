import { useState, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import Toolbar from "./Toolbar";
import Table from "./Table";

import { remove, approve, getUnFulfilled } from "src/apis/inventory_slip.api";

import { history } from "src/App";
import { fireDelete, fireSuccess } from "src/utils/alert";
import { setFilter } from "src/common/actions/config.action";
import { useQuery } from "react-query";
import { kiemKhoApi } from "src/1/apis/kiemkho.api";
import { useSetQueryData } from "src/1/hooks/query";
import { format } from "src/utils/moment";

const remapData = (_data) => {
  return _data.map((e) => ({
    ...e,
    checked: format(e?.checked),
    status: e?.approvedStatus,
  }));
};

const InventoryCheck = () => {
  //#region Data
  const [filters, setFilters] = useState({
    status: "",
    code: "",
    name: "",
  });

  const [status, setStatus] = useState(0);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["kiem-kho", filters],
    queryFn: () => kiemKhoApi.getAll(filters),
    select: (dataResponse) =>
      remapData(
        Array.isArray(dataResponse) ? dataResponse : dataResponse?.data?.data
      ),
  });

  const { setQueryData } = useSetQueryData(["kiem-kho", filters]);

  const isSelectAll = useMemo(() => data?.every((d) => d.check), [data]);

  const selected = useMemo(
    () => (isFetching ? [] : data?.filter((d) => d.check) || []),
    [data, isFetching]
  );
  //#endregion

  //#region Events
  const select = useCallback(
    (code, v) =>
      setQueryData(
        data?.map((d) =>
          code === -1 || d.code === code ? { ...d, check: v } : d
        )
      ),
    [data]
  );

  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onSearch = useCallback((data) => dispatch(setFilter(NAME, data)), []);

  const onApproved = useCallback(async () => {
    setFetching(true);
    const res = await approve({
      code: selected.map((m) => m.code),
      status: 1,
    });

    if (res.exitcode === 200) {
      refetch();
    } else {
      setFetching(false);
    }
  }, [selected]);

  const onEdit = useCallback(async () => {
    const code = data.find((d) => d.check).code;
    history.push(`/inventory-check/form/${code}`);
  }, [data]);

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

  const onExport = useCallback(async () => {
    // await toExcel(data);
  }, []);

  const onAdd = () => history.push("/material/items/form");
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
            onAdd={onAdd}
            onEdit={onEdit}
            onApproved={onApproved}
            onRemove={onRemove}
            onSearch={onSearch}
            onExport={onExport}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>

        <CCardBody className="px-0 pt-0">
          <Table
            loading={isFetching}
            isSelectAll={isSelectAll}
            data={data || []}
            onSelect={select}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default InventoryCheck;
