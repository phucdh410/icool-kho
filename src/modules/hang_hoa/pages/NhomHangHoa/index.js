import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";

import { CCard, CCardHeader, CCardBody, CRow, CCol } from "@coreui/react";

import Toolbar from "./Toolbar";
import Search from "./Search";
import Table from "./Table";
import Form from "./Form";

import { nhomHangHoaApi } from "src/1/apis/nhom_hang_hoa.api";

import { isSuccess } from "src/utils/funcs";
import { useQuery } from "react-query";
import { useSetQueryData } from "src/1/hooks/query";
import { format } from "src/utils/moment";

const remapData = (_data) => {
  return _data.map((e) => ({
    ...e,
    checked: format(e?.checked),
  }));
};

const NhomHangHoa = () => {
  const ref = useRef();

  //#region Data
  const [status, setStatus] = useState(0);

  const [filters, setFilters] = useState({});

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["nhom-hang-hoa", filters],
    queryFn: () => nhomHangHoaApi.getAll(filters),
    select: (response) =>
      remapData(Array.isArray(response) ? response : response?.data?.data),
  });

  const { setQueryData } = useSetQueryData(["nhom-hang-hoa", filters]);

  const isSelectAll = useMemo(
    () => data?.every((d) => d.check) ?? false,
    [data]
  );

  const selected = useMemo(() => data?.filter((d) => d.check) || [], [data]);
  //#endregion

  //#region Events
  const onSelect = (code, value) => {
    setQueryData(
      data && data?.length > 0
        ? data.map((d) =>
            code === -1 || d.code === code ? { ...d, check: value } : d
          )
        : []
    );
  };

  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onAdd = () => {
    onStatusChange(2);
  };

  const onEdit = async () => {
    onStatusChange(3);

    if (selected[0]) {
      const editData = {
        code: selected[0]?.code,
        name: selected[0]?.name,
        active: !!selected[0]?.active,
        acronym: selected[0]?.acronym,
        note: selected[0]?.note,
        industryCode: selected[0]?.industryCode,
        industryName: selected[0]?.industryCode,
      };

      ref.current.clear(editData);
    }
  };

  const onSearch = (where) => {
    setFilters(where);
  };

  const onSave = () => {
    ref.current.handleSubmit(async (values) => {
      try {
        const func =
          status === 3 ? nhomHangHoaApi.update : nhomHangHoaApi.create;

        await func(values);

        refetch();
        setStatus(0);
        ref.current.clear();
        noti("success", "Thành công");
      } catch (error) {
        noti("error", "Lỗi");
      }
    })();
  };

  const onRemove = async () => {
    const res = await nhomHangHoaApi.remove({ id: selected[0]?.id });

    if (isSuccess(res)) {
      refetch();
    }
  };

  const onExport = () => {
    try {
      nhomHangHoaApi.exportExcel(filters);
    } catch (error) {
      noti("error", "Export excel không thành công!");
    }
  };
  //#endregion

  useEffect(() => {
    if (selected.length !== 1 && status === 3) setStatus(0);
  }, [selected]);

  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            status={status}
            selectedNo={selected.length}
            canSave={status}
            onAdd={onAdd}
            onEdit={onEdit}
            onRemove={onRemove}
            onSave={onSave}
            onExport={onExport}
          />
        </CCardBody>
      </CCard>

      <CRow>
        <CCol
          xs="12"
          sm="12"
          md={status > 1 ? 5 : 12}
          lg={status > 1 ? 5 : 12}
          xl={status > 1 ? 5 : 12}
        >
          <CCard>
            <CCardHeader>
              <Search onSearch={onSearch} />
            </CCardHeader>
            <CCardBody className="px-0 pt-0">
              <Table
                onSelect={onSelect}
                isSelectAll={isSelectAll}
                data={data}
                loading={isFetching}
              />
            </CCardBody>
          </CCard>
        </CCol>

        <CCol
          xs="12"
          sm="12"
          md={status > 1 && 7}
          lg={status > 1 && 7}
          xl={status > 1 && 7}
          className={classNames(!status && "d-none")}
        >
          <CCard>
            <CCardBody className="bg-light-blue">
              <Form ref={ref} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default NhomHangHoa;
