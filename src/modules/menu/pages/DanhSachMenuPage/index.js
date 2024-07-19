import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { menuApi } from "src/1/apis/menu.api";
import { AddGoodsModal, ListToolbar, MenuTable } from "../../components";
import { useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { useSetQueryData } from "src/1/hooks/query";
import { history } from "src/App";
import { fireError, fireSuccess } from "src/utils/alert";

const DanhSachMenuPage = () => {
  const addModalRef = useRef(null);
  //#region Data
  const [status, setStatus] = useState(0);

  const [params, setParams] = useState({
    code: "",
    status: "",
    start_at: dayjs().set("date", 1).toDate(),
    end_at: dayjs().endOf("month").toDate(),
    date: null,
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["menu-list", params],
    queryFn: () => menuApi.getAll(params),
    select: (response) =>
      Array.isArray(response) ? response : response?.data?.data,
  });

  const { setQueryData } = useSetQueryData(["menu-list", params]);

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

  const onAdd = () => history.push("/menus/form");

  const onEdit = () => {
    const id = data.find((e) => e.check)?.id;
    history.push(`/menus/form/${id}`);
  };

  const onRemove = async () => {
    const allow = await fireDelete();
    if (allow) {
      try {
        await menuApi.remove(selected?.[0]?.code);
        refetch();
        fireSuccess();
      } catch (error) {
        fireError();
      }
    }
  };

  const onAddHH = () => {
    const selectedItem = selected?.[0];
    addModalRef.current?.open(selectedItem?.id, selectedItem?.name);
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
            selected={selected}
            onAddHH={onAddHH}
          />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardHeader></CCardHeader>
        <CCardBody className="px-0 pt-0">
          <MenuTable
            loading={isFetching}
            isSelectAll={isSelectAll}
            data={data}
            onSelect={onSelect}
          />
        </CCardBody>
      </CCard>

      <AddGoodsModal ref={addModalRef} />
    </>
  );
  //#endregion
};

export default DanhSachMenuPage;
