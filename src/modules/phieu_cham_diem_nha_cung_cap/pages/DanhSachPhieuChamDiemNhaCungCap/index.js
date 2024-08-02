import { useMemo, useState } from "react";
import { useQuery } from "react-query";
import dayjs from "dayjs";

import { CCard, CCardBody, CCardHeader } from "@coreui/react";

import { nhaCungCapApi } from "src/1/apis/nha_cung_cap.api";
import { useSetQueryData } from "src/1/hooks/query";
import { history } from "src/App";
import { fireDelete, fireError, fireSuccess } from "src/utils/alert";

import { ListTable, ListToolbar } from "../../components";

const DanhSachPhieuChamDiemNhaCungCap = () => {
  //#region Data
  const [status, setStatus] = useState(0);

  const [params, setParams] = useState({
    cycle: "",
    year: dayjs().year(),
    start_at: dayjs().set("date", 1).toDate(),
    end_at: dayjs().endOf("month").toDate(),
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-de-xuat-nha-cung-cap", params],
    queryFn: () => nhaCungCapApi.getAll(params),
    select: (response) =>
      Array.isArray(response) ? response : response?.data?.data,
  });

  const { setQueryData } = useSetQueryData([
    "danh-sach-de-xuat-nha-cung-cap",
    params,
  ]);

  const isSelectAll = useMemo(() => data?.every((e) => e.check), [data]);

  const selected = useMemo(() => data?.filter((e) => e.check) ?? [], [data]);
  //#endregion

  //#region Event
  const onStatusChange = (_status) =>
    setStatus(_status === status ? 0 : _status);

  const onSelect = (code, value) => {
    setQueryData(
      data?.map((e) =>
        code === -1 || e.code === code ? { ...e, check: value } : e
      )
    );
  };

  const onSearch = (_params) => setParams(_params);

  const onAdd = () => history.push("/suppliers/create");

  const onEdit = () => {
    const id = data.find((e) => e.check)?.id;
    history.push(`/suppliers/edit/${id}`);
  };

  const onRemove = async () => {
    const allow = await fireDelete();
    if (allow) {
      try {
        await nhaCungCapApi.remove(selected?.[0]?.id);
        refetch();
        fireSuccess();
      } catch (error) {
        fireError();
      }
    }
  };
  //#endregion

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <ListToolbar
            params={params}
            status={status}
            toggleStatus={onStatusChange}
            canAdd
            canEdit={selected?.length === 1}
            canRemove={selected?.length === 1}
            onAdd={onAdd}
            onEdit={onEdit}
            onRemove={onRemove}
            onSearch={onSearch}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody className="px-0 pt-0">
          <ListTable
            loading={isFetching}
            isSelectAll={isSelectAll}
            data={data}
            onSelect={onSelect}
          />
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};
export default DanhSachPhieuChamDiemNhaCungCap;
