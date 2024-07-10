import { CCard, CCardBody, CCardHeader } from "@coreui/react";
import { menuApi } from "src/1/apis/menu.api";
import { ListToolbar, MenuTable } from "../../components";
import { useMemo, useState } from "react";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { filter } from "src/utils/funcs";
import { useSetQueryData } from "src/1/hooks/query";
import { history } from "src/App";
import { fireError, fireSuccess } from "src/utils/alert";

const DanhSachMenuPage = () => {
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
    queryFn: () => menuApi.getAll(filter(params)),
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
    const code = data.find((e) => e.check)?.code;
    history.push(`/menus/form/${code}`);
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
            canRemove={selected?.length === 1}
            onAdd={onAdd}
            onEdit={onEdit}
            onRemove={onRemove}
            onSearch={onSearch}
            selected={selected}
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
    </>
  );
  //#endregion
};

export default DanhSachMenuPage;
