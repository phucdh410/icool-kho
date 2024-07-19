import { useState, useCallback, useMemo, useRef } from "react";

import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import Toolbar from "./Toolbar";
import Table from "./Table";

import { history } from "src/App";
import { fireDelete, fireError, fireSuccess } from "src/utils/alert";
import { useQuery } from "react-query";
import { deXuatHangHoaApi } from "src/1/apis/de_xuat_hang_hoa.api";
import { useSetQueryData } from "src/1/hooks/query";
import { format } from "src/utils/moment";
import { AddToMenuModal } from "../../components";
import { hangHoaApi } from "src/1/apis/hang_hoa.api";

const remapData = (_data) => {
  return _data.map((e) => ({
    ...e,
    checked: format(e?.checked),
    status: e?.approvedStatus,
  }));
};

const InventoryCheck = () => {
  const modalRef = useRef(null);

  //#region Data
  const [filters, setFilters] = useState({
    status: "",
    code: "",
    name: "",
  });

  const [status, setStatus] = useState(0);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["mat-hang", filters],
    queryFn: () => hangHoaApi.getAll(filters),
    select: (dataResponse) =>
      remapData(
        Array.isArray(dataResponse) ? dataResponse : dataResponse?.data?.data
      ),
  });

  const { setQueryData } = useSetQueryData(["mat-hang", filters]);

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

  const onSearch = (data) => setFilters(data);

  const onAddToMenu = () => {
    modalRef.current?.open(selected?.[0]);
  };
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
            onAddToMenu={onAddToMenu}
            onSearch={onSearch}
            selectedItem={selected?.[0]}
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

      <AddToMenuModal ref={modalRef} />
    </>
  );
};

export default InventoryCheck;
