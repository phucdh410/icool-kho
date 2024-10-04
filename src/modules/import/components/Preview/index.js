import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { useQuery } from "react-query";

import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

import { phieuNhapHangApi } from "src/1/apis/phieu_nhap_hang.api";
import { format } from "src/utils/moment";

import { CInput } from "_components/controls";
import { CDialog, CLoading, CPagination, CTable } from "_components/others";

export default forwardRef((props, ref) => {
  //#region Data
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [paginate, setPaginate] = useState({ page: 1, limit: 10 });

  const { data, isFetching } = useQuery({
    queryKey: ["preview-phieu-nhap-hang", id],
    queryFn: () => phieuNhapHangApi.getById(id),
    enabled: !!id,
    select: (response) => response?.data?.data,
  });

  const total = useMemo(
    () =>
      data?.materials?.length > 0
        ? data.materials.reduce(
            (prev, cur) => prev + cur?.price * cur?.ware_q,
            0
          )
        : 0,
    [data]
  );
  //#endregion

  //#region Event
  const onClose = () => {
    setOpen(false);
    setId("");
  };

  const onPaginationChange = (newPaginate) => setPaginate(newPaginate);
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
      key: "material_code",
      label: "Mã MH",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "name",
      label: "Tên MH",
      _style: { width: "350px", minWidth: "350px", textAlign: "left" },
    },
    {
      key: "ware_q",
      label: "Số lượng",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "unit",
      label: "ĐVT",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "total",
      label: "Thành tiền",
      _style: { width: "150px", minWidth: "150px", textAlign: "right" },
    },
  ];
  const render = {
    name: ({ name }) => <td className="text-left">{name}</td>,
    total: ({ price, ware_q }) => (
      <td className="text-right">{(price * ware_q).toLocaleString()}</td>
    ),
  };

  return (
    <CDialog
      title={`Phiếu nhập hàng: ${data?.code || "LOADING..."}`}
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
                <CInput readOnly label="Chi nhánh" value={data?.store_name} />
              </CCol>
              <CCol xs="12" sm="4" md="4" lg="3" xl="3" xxl="3">
                <CInput
                  readOnly
                  label="Ngày mua"
                  value={data ? format(data.date) : ""}
                />
              </CCol>
              <CCol xs="12" sm="4" md="4" lg="5" xl="3" xxl="3">
                <CInput
                  readOnly
                  label="Tổng tiền"
                  value={total?.toLocaleString()}
                />
              </CCol>
              <CCol xs="12" sm="4" md="4" lg="5" xl="4" xxl="4">
                <CInput
                  readOnly
                  label="Số điện thoại"
                  value={data?.phone_number}
                />
              </CCol>
              <CCol xs="12" sm="8" md="4" lg="5" xl="8" xxl="8">
                <CInput readOnly label="Địa chỉ" value={data?.address} />
              </CCol>
              <CCol xs="12" sm="12" md="12" lg="7" xl="12" xxl="12">
                <CInput readOnly label="Ghi chú" value={data?.note} />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardBody className={"p-0"}>
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
