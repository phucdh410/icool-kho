import { useMemo, useState, useCallback, useRef, useEffect } from "react";
import classNames from "classnames";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";

import Toolbar from "./Toolbar";
import Search from "./Search";
import Table from "./Table";
import Form from "./Form";

import { getAll } from "_common/queries-fn/material.query";
import {
  createMaterialSuggest,
  updateMaterialSuggest,
  removeMaterialSuggest,
} from "src/apis/material_suggest.api";
import { isSuccess } from "src/utils/funcs";
import { ERROR_MESSAGE } from "src/configs/constant";
import { exportExcel } from "src/apis/material_industry.api";
import { formatPayload } from "./func";
import { CButton } from "src/common/components/controls";
import { MPriceSuggest } from "../../components";

const MOCK = [
  {
    id: "1",
    code: "0001",
    name: "Đồ ăn nhẹ tại chi nhánh 1",
    don_gia_thap_nhat: 400000,
    don_vi_mua_hang: "KG",
    created_by: "Huỳnh Minh Tân",
    status: 1,
    nha_cung_cap_de_xuat: "Thuận Hương",
  },
  {
    id: "2",
    code: "0002",
    name: "Thực phẩm tươi sống tại chi nhánh 2",
    don_gia_thap_nhat: 500000,
    don_vi_mua_hang: "KG",
    created_by: "Nguyễn Thị Bích",
    status: 1,
    nha_cung_cap_de_xuat: "Vissan",
  },
  {
    id: "3",
    code: "0003",
    name: "Đồ uống đóng hộp tại chi nhánh 3",
    don_gia_thap_nhat: 300000,
    don_vi_mua_hang: "THÙNG",
    created_by: "Lê Văn Nam",
    status: 1,
    nha_cung_cap_de_xuat: "Coca-Cola",
  },
  {
    id: "4",
    code: "0004",
    name: "Vật dụng vệ sinh tại chi nhánh 1",
    don_gia_thap_nhat: 200000,
    don_vi_mua_hang: "Cái",
    created_by: "Trần Thị Lan",
    status: 1,
    nha_cung_cap_de_xuat: "Unilever",
  },
  {
    id: "5",
    code: "0005",
    name: "Dụng cụ văn phòng tại chi nhánh 2",
    don_gia_thap_nhat: 100000,
    don_vi_mua_hang: "Hộp",
    created_by: "Phạm Văn Long",
    status: 1,
    nha_cung_cap_de_xuat: "Kokuyo",
  },
  {
    id: "6",
    code: "0006",
    name: "Thiết bị điện tử tại chi nhánh 3",
    don_gia_thap_nhat: 10000000,
    don_vi_mua_hang: "Cái",
    created_by: "Đặng Thị Mai",
    status: 1,
    nha_cung_cap_de_xuat: "Samsung",
  },
  {
    id: "7",
    code: "0007",
    name: "Nội thất văn phòng tại chi nhánh 1",
    don_gia_thap_nhat: 5000000,
    don_vi_mua_hang: "Bộ",
    created_by: "Nguyễn Văn Tùng",
    status: 1,
    nha_cung_cap_de_xuat: "Hoà Phát",
  },
  {
    id: "8",
    code: "0008",
    name: "Sách báo tạp chí tại chi nhánh 2",
    don_gia_thap_nhat: 150000,
    don_vi_mua_hang: "Cuốn",
    created_by: "Trần Thị Dung",
    status: 1,
    nha_cung_cap_de_xuat: "Tiến Thọ",
  },
  {
    id: "9",
    code: "0009",
    name: "Đồ chơi trẻ em tại chi nhánh 3",
    don_gia_thap_nhat: 250000,
    don_vi_mua_hang: "Cái",
    created_by: "Lê Thị Hà",
    status: 1,
    nha_cung_cap_de_xuat: "Bông Sen",
  },
  {
    id: "10",
    code: "0010",
    name: "Đồ chơi trẻ em tại chi nhán2h 3",
    don_gia_thap_nhat: 250000,
    don_vi_mua_hang: "Cái",
    created_by: "Lê Thị Hà",
    status: 1,
    nha_cung_cap_de_xuat: "Bông Sen",
  },
  {
    id: "11",
    code: "0011",
    name: "Đồ chơi trẻ em tại chi nhánh 12",
    don_gia_thap_nhat: 250000,
    don_vi_mua_hang: "Cái",
    created_by: "Lê Thị Hà",
    status: 1,
    nha_cung_cap_de_xuat: "Bông Sen",
  },
];

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const MaterialList = () => {
  const ref = useRef();
  //#region Data
  const isLoading = useSelector(selectIsLoading);

  const modalRef = useRef(null);

  const [filter, setFilter] = useState({});

  const { data, isLoading: loading, set, refetch } = getAll(filter, isLoading);

  const [status, setStatus] = useState(false);

  const isSelectAll = useMemo(
    () => data?.every((d) => d.check) ?? false,
    [data]
  );

  const selected = useMemo(() => data?.filter((d) => d.check) || [], [data]);
  //#endregion

  //#region Event
  const onSelect = (code, value) =>
    set(
      data.map((d) =>
        code === -1 || d.code === code ? { ...d, check: value } : d
      )
    );

  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onAdd = () => {
    onStatusChange(2);
  };

  const onEdit = async () => {
    onStatusChange(3);

    // data return get one is array
    const res = await getByCode(selected[0].code);

    if (res[0]) ref.current.clear(res[0]);
  };

  const onSearch = (where) => {
    setFilter(where);
  };

  const onSave = () => {
    ref.current.handleSubmit(
      async (d) => {
        const _payload = formatPayload(d);

        const func =
          status === 3 ? updateMaterialSuggest : createMaterialSuggest;
        const res = await func(_payload);

        if (isSuccess(res)) {
          refetch();
          setStatus(0);
          ref.current.clear();
          noti("success", "Thành công");
        } else {
          noti("error", ERROR_MESSAGE.NVL.REQUIRED);
        }
      },
      (e) => {}
    )();
  };

  const onRemove = async () => {
    const res = await removeMaterialSuggest(selected.map((c) => c.code));

    if (isSuccess(res)) {
      refetch();
    }
  };

  const onExport = () => {
    exportExcel(filter);
  };

  const onSuggest = () => {
    if (selected.length === 1) {
      const _code = selected[0]?.code;
      modalRef.current?.open(_code);
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
            CustomFeatures={
              <>
                <CButton
                  className="btn-primary"
                  disabled={!(selected?.length === 1 && status !== 2)}
                  onClick={onSuggest}
                >
                  Đề Xuất Giá
                </CButton>
              </>
            }
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
          className={classNames(status && "d-none")}
        >
          <CCard>
            <CCardHeader>
              <Search onSearch={onSearch} />
            </CCardHeader>
            <CCardBody className="px-0 pt-0">
              <Table
                onSelect={onSelect}
                isSelectAll={isSelectAll}
                data={MOCK || data}
                loading={loading}
              />
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" className={classNames(!status && "d-none")}>
          <CCard>
            <CCardBody className="bg-light-blue">
              <Form isEdit={status === 3} ref={ref} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      <MPriceSuggest ref={modalRef} />
    </>
  );
};

export default MaterialList;
