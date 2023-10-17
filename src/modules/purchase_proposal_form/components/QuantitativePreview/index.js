import { useState, useCallback } from "react";
import classNames from "classnames";

import { CCard, CCardBody, CCardHeader, CRow, CCol } from "@coreui/react";
import { CInput } from "_components/controls";
import { CDialog, CLoading, CTable, CPagination } from "_components/others";

import { format } from "src/utils/moment";
import { money } from "src/utils/funcs";

const MOCK_DATA = {
  id: "8d8b5dfa-c8e0-452f-8ad0-db0f0d4d433f",
  code: "IN000001",
  updatedDate: "2021-08-30T00:00:00.000Z",
  total: 10000,
  note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  storeCode: "1",
  storeName: "ICOOL Ung Văn Khiêm",
  storeAddress: "KARAOKE ICOOL 122 UNG VĂN KHIÊM PHƯỜNG 25 QUẬN BÌNH THẠNH",
  storePhone: "0835120708",
  wareCode: "1",
  materials: [
    {
      id: "1",
      code: "MH001",
      name: "Khô Mực Nướng",
      boughtUnit: "Con",
      total: 150000,
      quantity: 15,
    },
    {
      id: "2",
      code: "MH002",
      name: "Tương Ớt Petrolimex",
      boughtUnit: "Chai",
      total: 80000,
      quantity: 29,
    },
    {
      id: "3",
      code: "MH003",
      name: "Thịt mỡ bụng Phương",
      boughtUnit: "Kg",
      total: 199000,
      quantity: 51,
    },
    {
      id: "4",
      code: "MH004",
      name: "Tửu Nhi Hồng",
      boughtUnit: "Bình",
      total: 459000,
      quantity: 4,
    },
  ],
};

export default ({ code, getter, onClose }) => {
  //   const { data, isLoading } = getter(code); // Mở cái này khi ráp API
  const { isLoading } = getter(code); // Xóa 2 dòng này khi ráp Api
  const data = MOCK_DATA; // Xóa 2 dòng này khi ráp Api
  //   const [paginate, setPaginate] = useState({ page: 1, limit: 10 });
  const [materialPaginate, setMaterialPaginate] = useState({
    page: 1,
    limit: 10,
  });

  //   const onPaginationChange = useCallback(
  //     (_paginate) => setPaginate(_paginate),
  //     []
  //   );

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
      key: "boughtUnit",
      label: "ĐVT",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "quantity",
      label: "Số lượng",
      _style: { width: "150px", minWidth: "150px" },
    },
    {
      key: "total",
      label: "Thành tiền",
      _style: { width: "150px", minWidth: "150px", textAlign: "right" },
    },
  ];

  const renderMaterials = {
    name: ({ name }) => <td className="text-left">{name}</td>,
    total: ({ total }) => <td className="text-right">{money(total)}</td>,
    note: ({ note }) => <td className="text-left">{note}</td>,
  };

  //   const goodsFields = [
  //     {
  //       key: "code",
  //       label: "Mã NVL",
  //       _style: { width: "150px", minWidth: "150px" },
  //     },
  //     {
  //       key: "name",
  //       label: "Tên NVL",
  //       _style: { width: "300px", minWidth: "300px", textAlign: "left" },
  //     },
  //     {
  //       key: "quantity",
  //       label: "Số lượng",
  //       _style: { width: "150px", minWidth: "150px" },
  //     },
  //     {
  //       key: "boughtUnit",
  //       label: "ĐVT",
  //       _style: { width: "150px", minWidth: "150px" },
  //     },
  //     {
  //       key: "total",
  //       label: "Tổng tiền",
  //       _style: { width: "150px", minWidth: "150px", textAlign: "right" },
  //     },
  //     {
  //       key: "note",
  //       label: "Ghi chú",
  //       _style: { width: "250px", minWidth: "250px", textAlign: "left" },
  //     },
  //   ];

  //   const renderGoods = {
  //     name: ({ name }) => <td className="text-left">{name}</td>,
  //     total: ({ total }) => <td className="text-right">{money(total)}</td>,
  //     note: ({ note }) => <td className="text-left">{note}</td>,
  //   };

  return (
    <CDialog
      title={
        data
          ? `Danh sách nguyên vật liệu cập nhật định lượng: ${data.code}`
          : "LOADING..."
      }
      show={true}
      onClose={onClose}
    >
      <CLoading loading={isLoading}>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol xs="12" sm="6" md="6" lg="3" xl="3" xxl="3">
                <CInput readOnly label="Số chứng từ" value={data?.code} />
              </CCol>
              <CCol xs="12" sm="6" md="6" lg="4" xl="4" xxl="4">
                <CInput readOnly label="Chi nhánh" value={data?.storeName} />
              </CCol>
              <CCol xs="12" sm="4" md="4" lg="3" xl="3" xxl="3">
                <CInput
                  readOnly
                  label="Ngày cập nhật định lượng"
                  value={data ? format(data?.updatedDate) : ""}
                />
              </CCol>
              <CCol xs="12" sm="6" md="6" lg="2" xl="2" xxl="2">
                <CInput
                  readOnly
                  label="Số điện thoại"
                  value={data?.storePhone}
                />
              </CCol>
              <CCol xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                <CInput readOnly label="Địa chỉ" value={data?.storeAddress} />
              </CCol>
              <CCol xs="12" sm="12" md="12" lg="12" xl="12" xxl="12">
                <CInput readOnly label="Ghi chú" value={data?.note} />
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
              {/* <li className="nav-item">
                <span
                  className={classNames(
                    "nav-link text-center px-4",
                    current && "active"
                  )}
                  style={{ minWidth: "200px" }}
                  onClick={() => setCurrentTab(true)}
                >
                  Hàng hóa
                </span>
              </li> */}
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
              {/* <div
                className={classNames(
                  "table-responsive tab-pane fade",
                  current && "show active"
                )}
              >
                <CTable
                  loading={isLoading}
                  data={data?.goods ?? []}
                  page={paginate.page}
                  itemsPerPage={paginate.limit}
                  fields={goodsFields}
                  render={renderGoods}
                  footer={
                    <CPagination
                      page={paginate.page}
                      total={data?.materials.length}
                      limit={paginate.limit}
                      onPaginationChange={onPaginationChange}
                    />
                  }
                />
              </div> */}
            </div>
          </CCardBody>
        </CCard>
      </CLoading>
    </CDialog>
  );
};
