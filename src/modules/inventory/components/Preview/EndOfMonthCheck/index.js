import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import { useQuery } from "react-query";

import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

import { kiemKhoCuoiThangApi } from "src/1/apis/kiem_kho_cuoi_thang.api";
import { money } from "src/utils/funcs";
import { format } from "src/utils/moment";

import { CInput } from "_components/controls";
import { CDialog, CLoading, CPagination, CTable } from "_components/others";

export default forwardRef(({ ...props }, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);

  const [data, setData] = useState(null);

  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });
  //#endregion

  //#region Event
  const onClose = () => {
    setOpen(false);
    setData(null);
  };

  const onPaginationChange = (_paginate) => setPaginate(_paginate);
  //#endregion

  useImperativeHandle(ref, () => ({
    open: async (id) => {
      try {
        const res = await kiemKhoCuoiThangApi.getById(id);
        setData(res?.data?.data);
        setOpen(true);
      } catch (error) {
        noti("error", error?.message ?? "Không thể xem chi tiết phiếu");
      }
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
      key: "ware_q",
      label: "Số lượng",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "ware_unit",
      label: "ĐVT",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "total",
      label: "Tổng tiền",
      _style: { width: "150px", minWidth: "150px", textAlign: "right" },
    },
  ];
  const render = {
    name: ({ name }) => <td className="text-left">{name}</td>,
    total: ({ ware_q, price }) => (
      <td className="text-right">{(ware_q * price)?.toLocaleString()}</td>
    ),
  };

  return (
    <CDialog
      title={data ? `Phiếu kiểm hàng: ${data.code}` : "LOADING..."}
      show={open}
      onClose={onClose}
    >
      <CCard>
        <CCardBody>
          <CRow>
            <CCol xs="12" sm="6" md="6" lg="3" xl="3" xxl="3">
              <CInput readOnly label="Mã phiếu" value={data?.code} />
            </CCol>
            <CCol xs="12" sm="6" md="6" lg="3" xl="3" xxl="3">
              <CInput readOnly label="Kho" value={data?.store_name} />
            </CCol>
            <CCol xs="12" sm="4" md="4" lg="3" xl="3" xxl="3">
              <CInput
                readOnly
                label="Ngày kiểm"
                value={data ? format(data.checked) : ""}
              />
            </CCol>
            <CCol xs="12" sm="4" md="4" lg="3" xl="3" xxl="3">
              <CInput readOnly label="Người kiểm" value={data?.created_by} />
            </CCol>
            <CCol xs="12" sm="4" md="4" lg="5" xl="3" xxl="3">
              <CInput
                readOnly
                label="Tổng tiền"
                value={data ? data.value?.toLocaleString() : ""}
              />
            </CCol>
            <CCol xs="12" sm="12" md="12" lg="7" xl="9" xxl="9">
              <CInput readOnly label="Ghi chú" value={data?.note} />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody className="p-0">
          <CTable
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
    </CDialog>
  );

  //#endregion
});
