import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { comboApi } from "src/1/apis/combo.api";
import { useSetQueryData } from "src/1/hooks/query";
import { history } from "src/App";
import { fireDelete, fireError, fireSuccess } from "src/utils/alert";

import { ComboTable, ComboToolbar } from "../../components";

const DanhSachCombo = () => {
  //#region Data
  const [params, setParams] = useState({
    status: "",
    code: "",
    name: "",
    start: null,
    end: null,
  });

  const [status, setStatus] = useState(0);

  const { data, isFetching } = useQuery({
    queryKey: ["danh-sach-combo", params],
    queryFn: () => comboApi.getAll(params),
    select: (dataResponse) =>
      Array.isArray(dataResponse) ? dataResponse : dataResponse?.data?.data,
  });

  const { setQueryData } = useSetQueryData(["danh-sach-combo", params]);

  const isSelectAll = useMemo(() => data?.every((d) => d.check), [data]);

  const selected = useMemo(
    () => (isFetching ? [] : data?.filter((d) => d.check) || []),
    [data, isFetching]
  );
  //#endregion

  //#region Event
  const onSelect = (code, value) => {
    setQueryData(
      data?.map((e) =>
        code === -1 || e.code === code ? { ...e, check: value } : e
      )
    );
  };

  const onStatusChange = (_status) =>
    setStatus(_status === status ? 0 : _status);

  const onSearch = (data) => setParams(data);

  const onEdit = () => {
    const id = data.find((e) => e.check)?.id;
    history.push(`/combos/edit/${id}`);
  };

  const onRemove = async () => {
    const allow = await fireDelete();
    if (allow) {
      try {
        await comboApi.remove(selected?.[0]?.id);
        refetch();
        fireSuccess();
      } catch (error) {
        fireError();
      }
    }
  };

  const onPause = async () => {
    try {
      await comboApi.updateStatus(selected?.[0]?.id);
      refetch();
      noti("success", "Ngưng chạy combo thành công!");
    } catch (error) {
      noti("error", error?.message || "Lỗi");
    }
  };
  //#endregion

  //#region Render
  return (
    <>
      <ComboToolbar
        params={params}
        status={status}
        toggleStatus={onStatusChange}
        canEdit={selected?.length === 1}
        canRemove={selected?.length === 1}
        onEdit={onEdit}
        onRemove={onRemove}
        onSearch={onSearch}
        selected={selected}
        onPause={onPause}
      />

      <ComboTable
        loading={isFetching}
        isSelectAll={isSelectAll}
        data={data}
        onSelect={onSelect}
      />
    </>
  );
  //#endregion
};
export default DanhSachCombo;
