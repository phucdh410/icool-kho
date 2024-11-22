import { useCallback, useState } from "react";
import { useQuery } from "react-query";
import classNames from "classnames";

import { CCard, CCardBody, CCardHeader, CCol, CRow } from "@coreui/react";

import { getTransferById } from "src/apis/material.api";
import { money } from "src/utils/funcs";
import { format } from "src/utils/moment";

import { CInput } from "_components/controls";
import { CDialog, CLoading, CPagination, CTable } from "_components/others";

export default ({ id, onClose }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["preview-phieu-luan-chuyen", id],
    queryFn: () => getTransferById(id),
    enabled: !!id,
  });
  const [materialPaginate, setMaterialPaginate] = useState({
    page: 1,
    limit: 10,
  });

  const onMaterialPaginationChange = useCallback(
    (_paginate) => setMaterialPaginate(_paginate),
    []
  );

  const [current, setCurrentTab] = useState(0);

  const materialFields = [
    {
      key: "code",
      label: "Mã NVL",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "name",
      label: "Tên NVL",
      _style: { width: "300px", minWidth: "300px", textAlign: "left" },
    },
    {
      key: "quantity",
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
      label: "Tổng tiền",
      _style: { width: "150px", minWidth: "150px", textAlign: "right" },
    },
    {
      key: "note",
      label: "Ghi chú",
      _style: { width: "350px", minWidth: "350px", textAlign: "left" },
    },
  ];

  const renderMaterials = {
    name: ({ name }) => <td className="text-left">{name}</td>,
    total: ({ total }) => <td className="text-right">{money(total)}</td>,
    note: ({ note }) => <td className="text-left">{note}</td>,
  };

  return (
    <CDialog
      title={data ? `Phiếu đề xuất: ${data.code}` : "LOADING..."}
      show={true}
      onClose={onClose}
    >
      <CLoading loading={isLoading}>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol xs="12" sm="6" md="6" lg="4" xl="4" xxl="4">
                <CInput readOnly label="Mã phiếu" value={data?.code} />
              </CCol>
              <CCol xs="12" sm="6" md="6" lg="4" xl="4" xxl="4">
                <CInput
                  readOnly
                  label="Chi nhánh chuyển"
                  value={data?.store_from?.name}
                />
              </CCol>
              <CCol xs="12" sm="6" md="6" lg="4" xl="4" xxl="4">
                <CInput
                  readOnly
                  label="Chi nhánh nhận"
                  value={data?.store_to?.name}
                />
              </CCol>
              <CCol xs="12" sm="6" md="6" lg="4" xl="4" xxl="4">
                <CInput
                  readOnly
                  label="Ngày chuyển"
                  value={data ? format(data.date) : ""}
                />
              </CCol>
              <CCol xs="12" sm="6" md="6" lg="4" xl="4" xxl="4">
                <CInput readOnly label="Ghi chú" value={data?.note} />
              </CCol>
              <CCol xs="12" sm="6" md="6" lg="4" xl="4" xxl="4">
                <CInput
                  readOnly
                  label="Địa chỉ"
                  value={data?.store_from?.address}
                />
              </CCol>
              <CCol xs="12" sm="6" md="6" lg="4" xl="4" xxl="4">
                <CInput
                  readOnly
                  label="Số điện thoại"
                  value={data?.store_from?.phone}
                />
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader className="p-0 tabs border-0">
            <ul className="nav nav-tabs modules">
              <li className="nav-item">
                <span
                  className={classNames(
                    "nav-link text-center px-4",
                    !current && "active"
                  )}
                  style={{ minWidth: "200px" }}
                  onClick={() => setCurrentTab(false)}
                >
                  Nguyên Vật Liệu
                </span>
              </li>
            </ul>
          </CCardHeader>
          <CCardBody className="p-0">
            <div className="tab-content">
              <div
                className={classNames(
                  "table-responsive tab-pane fade",
                  !current && "show active"
                )}
              >
                <CTable
                  loading={isLoading}
                  data={data?.materials ?? []}
                  page={materialPaginate.page}
                  itemsPerPage={materialPaginate.limit}
                  fields={materialFields}
                  render={renderMaterials}
                  footer={
                    <CPagination
                      page={materialPaginate.page}
                      total={data?.materials.length}
                      limit={materialPaginate.limit}
                      onPaginationChange={onMaterialPaginationChange}
                    />
                  }
                />
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CLoading>
    </CDialog>
  );
};
