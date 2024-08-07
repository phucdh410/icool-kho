import { useCallback, useMemo,useState } from "react";
import { useQuery } from "react-query";

import { CCard, CCardBody,CCardHeader } from "@coreui/react";

import { deXuatHangHoaApi } from "src/1/apis/de_xuat_hang_hoa.api";
import { useSetQueryData } from "src/1/hooks/query";
import { history } from "src/App";
import { fireDelete, fireError, fireSuccess } from "src/utils/alert";
import { format } from "src/utils/moment";

import Table from "./Table";
import Toolbar from "./Toolbar";

const remapData = (_data) => {
  return _data.map((e) => ({
    ...e,
    checked: format(e?.checked),
    status: e?.approvedStatus,
  }));
};

const DeXuatHangHoa = () => {
  //#region Data
  const [filters, setFilters] = useState({
    status: "",
    code: "",
    name: "",
  });

  const [status, setStatus] = useState(0);

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-de-xuat-hang-hoa", filters],
    queryFn: () => deXuatHangHoaApi.getAll(filters),
    select: (dataResponse) =>
      remapData(
        Array.isArray(dataResponse) ? dataResponse : dataResponse?.data?.data
      ),
  });

  const { setQueryData } = useSetQueryData([
    "danh-sach-de-xuat-hang-hoa",
    filters,
  ]);

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

  const onApproved = useCallback(async () => {}, [selected]);

  const onEdit = useCallback(async () => {
    const code = data.find((d) => d.check).code;
    history.push(`/goods/form/${code}`);
  }, [data]);

  const onRemove = async () => {
    const allow = await fireDelete();
    if (allow) {
      try {
        await deXuatHangHoaApi.delete({ id: selected?.[0]?.id });
        refetch();
        fireSuccess();
      } catch (error) {
        fireError();
      }
    }
  };

  const onExport = useCallback(async () => {
    // await toExcel(data);
  }, []);

  const onAdd = () => history.push("/goods/form");
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
    </>
  );
};

export default DeXuatHangHoa;
