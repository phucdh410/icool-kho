import { useCallback, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { kiemKhoCuoiThangApi } from "src/1/apis/kiem_kho_cuoi_thang.api";
import { useSetQueryData } from "src/1/hooks/query";
import { history } from "src/App";
import { fireDelete, fireSuccess } from "src/utils/alert";
import { format } from "src/utils/moment";

import { NAME } from "../../../reducers/inventory-end-of-month-check";

import Table from "./Table";
import Toolbar from "./Toolbar";

const remapData = (_data) => {
  return _data.map((e) => ({
    ...e,
    checked: format(e?.checked),
    status: e?.approvedStatus,
  }));
};

const InventoryEndOfMonthCheck = () => {
  const dispatch = useDispatch();
  //#region Data
  const [status, setStatus] = useState(0);

  const [filters, setFilters] = useState({
    code: "",
    store_code: "",
    start_at: "",
    end_at: "",
    approved_status: "",
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["kiem-kho-cuoi-thang", filters],
    queryFn: () => kiemKhoCuoiThangApi.getAll(filters),
    select: (dataResponse) =>
      remapData(
        Array.isArray(dataResponse) ? dataResponse : dataResponse?.data?.data
      ),
  });

  const { setQueryData } = useSetQueryData(["kiem-kho-cuoi-thang", filters]);

  const { data: response } = useQuery({
    queryKey: ["unfulfilled"],
    queryFn: () => getUnFulfilled(),
  });

  const chua_kiem_store_list = useMemo(() => {
    if (response?.data) {
      return response.data.map((e) => e.name).join(", ");
    } else return "";
  }, [response]);

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

  const onSearch = (newFilters) => setFilters(newFilters);

  const onApproved = async () => {
    await kiemKhoCuoiThangApi.approve({
      id: selected[0]?.id,
      status: 1,
    });

    refetch();
  };

  const onEdit = async () => {
    const code = data.find((d) => d.check).code;
    history.push(`/inventory-check/form/${code}`);
  };

  const onRemove = async () => {
    const allow = await fireDelete();
    if (allow) {
      const res = await kiemKhoCuoiThangApi.remove(selected[0]?.id);

      if (res.exitcode == 200) {
        refetch();
        fireSuccess();
      } else {
        fireError();
      }
    }
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
            onEdit={onEdit}
            onApproved={onApproved}
            onRemove={onRemove}
            onSearch={onSearch}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        {chua_kiem_store_list && (
          <p
            style={{
              paddingInline: "16px",
              color: "#F26464",
              fontSize: "16px",
            }}
          >
            <i>Thông báo:</i>&nbsp;Còn chi nhánh&nbsp;
            <span style={{ fontWeight: 500 }}>{chua_kiem_store_list}</span>
            &nbsp; chưa kiểm kho
          </p>
        )}
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

export default InventoryEndOfMonthCheck;
