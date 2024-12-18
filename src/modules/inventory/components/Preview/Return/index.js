import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { useQuery } from "react-query";

import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

import { phieuTraHangApi } from "src/1/apis/phieu_tra_hang.api";
import { format } from "src/utils/moment";

import { CInput } from "_components/controls";
import { CDialog, CLoading, CPagination, CTable } from "_components/others";

export default forwardRef((props, ref) => {
  //#region Data
  const [id, setId] = useState("");
  const [open, setOpen] = useState(false);
  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

  const { data, isFetching } = useQuery({
    queryKey: ["chi-tiet-phieu-tra-hang", id],
    queryFn: () => phieuTraHangApi.getById(id),
    enabled: !!id,
    select: (response) => response?.data?.data,
  });
  //#endregion

  //#region Event
  const onClose = () => {
    setId("");
    setOpen(false);
  };

  const onPaginationChange = useCallback(
    (_paginate) => setPaginate(_paginate),
    []
  );

  const mapStatus = useCallback(({ approvedStatus }) => {
    switch (approvedStatus) {
      case 1:
        return <td className="text-success">Xác nhận</td>;
      case 2:
        return <td className="text-danger">Từ chối</td>;
      default:
        return <td className="text-warning">Chưa xác nhận</td>;
    }
  }, []);
  //#endregion

  useImperativeHandle(ref, () => ({
    open: (selectedId) => {
      setId(selectedId);
      setOpen(true);
    },
  }));

  //#region Render
  const fields = [
    {
      key: "code",
      label: "Mã NVL",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "name",
      label: "Tên NVL",
      _style: { width: "350px", minWidth: "350px", textAlign: "left" },
    },
    {
      key: "wareQ",
      label: "Số lượng",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "wareUnit",
      label: "ĐVT",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "total",
      label: "Tổng tiền",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "approvedStatus",
      label: "Trạng thái",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "reason",
      label: "Nguyên do",
      _style: { width: "auto", minWidth: "250px", textAlign: "left" },
    },
    {
      key: "files",
      label: "Hình ảnh",
      _style: { width: "200px", minWidth: "200px" },
    },
  ];
  const render = {
    name: ({ name }) => <td className="text-left">{name}</td>,
    approvedStatus: mapStatus,
    total: ({ total }) => <td className="text-right">{money(total)}</td>,
    reason: ({ reason }) => <td className="text-left">{reason}</td>,
    files: ({ files }) => (
      <td>
        {files.map((f) => (
          <span key={f}>i</span>
        ))}
      </td>
    ),
  };

  return (
    <CDialog
      title={`${data ? `Phiếu trả hàng: ${data.code}` : "LOADING..."}`}
      show={open}
      onClose={onClose}
    >
      <CLoading loading={isFetching}>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol xs="12" sm="6" md="6" lg="3" xl="3" xxl="3">
                <CInput readOnly label="Mã phiếu" value={data?.code} />
              </CCol>
              <CCol xs="12" sm="6" md="6" lg="3" xl="3" xxl="3">
                <CInput readOnly label="Kho" value={data?.ware_name} />
              </CCol>
              <CCol xs="12" sm="4" md="4" lg="3" xl="3" xxl="3">
                <CInput
                  readOnly
                  label="Ngày tạo"
                  value={data ? format(data.created_date) : ""}
                />
              </CCol>
              <CCol xs="12" sm="4" md="4" lg="3" xl="3" xxl="3">
                <CInput
                  readOnly
                  label="Ngày trả"
                  value={data ? format(data.date) : ""}
                />
              </CCol>
              <CCol xs="12" sm="4" md="4" lg="5" xl="3" xxl="3">
                <CInput readOnly label="Tổng tiền" value={data?.total} />
              </CCol>
              <CCol xs="12" sm="12" md="12" lg="7" xl="9" xxl="9">
                <CInput readOnly label="Ghi chú" value={data?.note} />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody>
            <CTable
              loading={isFetching}
              data={data?.materials ?? []}
              page={paginate.page}
              itemsPerPage={paginate.limit}
              fields={fields}
              render={render}
              footer={
                <CPagination
                  page={paginate.page}
                  total={data?.materials.length}
                  limit={paginate.limit}
                  onPaginationChange={onPaginationChange}
                />
              }
            />
          </CCardBody>
        </CCard>
      </CLoading>
    </CDialog>
  );
  //#endregion
});
