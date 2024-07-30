import { useMemo, useState } from "react";
import { useQuery } from "react-query";

import { comboApi } from "src/1/apis/combo.api";
import { useSetQueryData } from "src/1/hooks/query";
import { history } from "src/App";
import { fireDelete, fireError, fireSuccess } from "src/utils/alert";

import { ComboSuggestTable, ComboSuggestToolbar } from "../../components";

const DanhSachDeXuatCombo = () => {
  //#region Data
  const [params, setParams] = useState({
    status: "",
    code: "",
    name: "",
  });

  const [status, setStatus] = useState(0);

  const { data, isFetching } = useQuery({
    queryKey: ["danh-sach-de-xuat-combo", params],
    queryFn: () => comboApi.getAllSuggest(params),
    select: (dataResponse) =>
      Array.isArray(dataResponse) ? dataResponse : dataResponse?.data?.data,
  });

  const { setQueryData } = useSetQueryData(["danh-sach-de-xuat-combo", params]);

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

  const onAdd = () => history.push("/combos/create");

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

  const onApprove = async () => {
    try {
      await comboApi.updateStatus(selected?.[0]?.id);
      refetch();
      noti("success", "Duyệt combo thành công!");
    } catch (error) {
      noti("error", error?.message || "Lỗi");
    }
  };
  //#endregion

  //#region Render
  return (
    <>
      <ComboSuggestToolbar
        params={params}
        status={status}
        toggleStatus={onStatusChange}
        canEdit={selected?.length === 1}
        canRemove={selected?.length === 1}
        onEdit={onEdit}
        onRemove={onRemove}
        onSearch={onSearch}
        selected={selected}
        onApprove={onApprove}
        onAdd={onAdd}
      />

      <ComboSuggestTable
        loading={isFetching}
        isSelectAll={isSelectAll}
        data={data}
        onSelect={onSelect}
      />
    </>
  );
  //#endregion
};
export default DanhSachDeXuatCombo;
