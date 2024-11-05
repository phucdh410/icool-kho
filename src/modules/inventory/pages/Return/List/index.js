import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { phieuTraHangApi } from "src/1/apis/phieu_tra_hang.api";
import { useSetQueryData } from "src/1/hooks/query";
import { history } from "src/App";
import { fireDelete, fireError, fireSuccess } from "src/utils/alert";

import Table from "./Table";
import Toolbar from "./Toolbar";

const InventoryReturn = ({}) => {
  //#region Data
  const [status, setStatus] = useState(0);

  const [params, setParams] = useState({
    code: "",
    store_code: "",
    start_at: dayjs().startOf("month"),
    end_at: dayjs().endOf("month"),
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-phieu-tra-hang", params],
    queryFn: () => phieuTraHangApi.getAll(params),
    select: (response) =>
      Array.isArray(response) ? response : response?.data?.data,
  });

  const { setQueryData } = useSetQueryData([
    "danh-sach-phieu-tra-hang",
    params,
  ]);

  const isSelectAll = useMemo(() => data?.every((d) => d.check), [data]);

  const selected = useMemo(() => data?.filter((d) => d.check) || []);
  //#endregion

  //#region Events
  const onEdit = async () => {
    history.push(`/inventory-return/form/${selected[0].id}`);
  };

  const onRemove = async () => {
    const allow = await fireDelete();
    if (allow) {
      try {
        await phieuTraHangApi.remove(selected[0].id);
        refetch();
        fireSuccess();
      } catch (error) {
        fireError();
      }
    }
  };

  const select = (code, v) =>
    setQueryData(
      data?.map((d) =>
        code === -1 || d.code === code ? { ...d, check: v } : d
      )
    );

  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onSearch = (data) => setParams(data);
  //#endregion

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            filter={params}
            status={status}
            selectedNo={selected.length}
            toggleStatus={onStatusChange}
            onEdit={onEdit}
            onRemove={onRemove}
            onSearch={onSearch}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody className="px-0 pt-0">
          <Table
            loading={isFetching}
            isSelectAll={isSelectAll}
            data={data}
            onSelect={select}
          />
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};

export default InventoryReturn;
