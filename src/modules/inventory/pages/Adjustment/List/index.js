import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { createSelector } from "reselect";

import { CCard, CCardBody, CCol, CRow } from "@coreui/react";

import { dieuChinhLuongTonKho } from "src/1/apis/dieu_chinh_luong_ton_kho.api";
import { khoApi } from "src/1/apis/kho.api";
import { useSetQueryData } from "src/1/hooks/query";
import {
  create,
  getByCode,
  remove,
  update,
} from "src/apis/inventory_adjustment.api";
import { setFilter } from "src/common/actions/config.action";
import { CImagePreview } from "src/common/components/others";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";
import { fireDelete, fireError, fireSuccess } from "src/utils/alert";
import { isSuccess } from "src/utils/funcs";

import { getAll } from "_common/queries-fn/inventory-adjustment.query";

import { NAME } from "../../../reducers/inventory-adjustment";

import Form from "./Form";
import FormInput from "./FormInput";
import Table from "./Table";
import Toolbar from "./Toolbar";

const InventoryAdjustment = () => {
  const formRef = useRef();
  const materialRef = useRef();

  //#region Data
  const { data: warehouses = [] } = useQuery({
    queryKey: ["danh-sach-tat-ca-kho"],
    queryFn: () => khoApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({
        value: e?.code,
        code: e?.code,
        label: e?.name,
      })),
  });

  const [store_code, setStoreCode] = useState("");

  const [status, setStatus] = useState(0);

  const [editId, setEditId] = useState(null);

  const [params, setParams] = useState({
    code: "",
    ware_code: "",
    start_at: dayjs().startOf("month").toDate(),
    end_at: dayjs().endOf("month").toDate(),
  });

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-phieu-dieu-chinh-luong-ton-kho", params],
    queryFn: () => dieuChinhLuongTonKho.getALl(params),
    select: (response) =>
      Array.isArray(response) ? response : response?.data?.data,
  });

  const { setQueryData } = useSetQueryData([
    "danh-sach-phieu-dieu-chinh-luong-ton-kho",
    params,
  ]);

  const isSelectAll = useMemo(() => data?.every((d) => d.check), [data]);

  const selected = useMemo(() => data?.filter((d) => d.check) || []);
  //#endregion

  //#region Event
  const onSelect = (code, value) => {
    setQueryData(
      data.map((d) =>
        code === -1 || d.code === code ? { ...d, check: value } : d
      )
    );
  };

  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onSearch = (data) => setParams(data);

  const onAdd = () => {
    setEditId(null);
    onStatusChange(2);
  };

  const onEdit = async () => {
    if (status === 3) {
      setEditId(null);
      setStatus(0);
    } else {
      const form = data.find((d) => d.check);
      form && setEditId(form.id);
    }
  };

  const onSave = async (_data) => {
    try {
      const { id, ...payload } = _data;
      if (status === 2) {
        await dieuChinhLuongTonKho.create(payload);
        noti("success", SUCCESS_MESSAGE.INVENTORY_ADJUSTMENT.CREATE);
      } else {
        const materials = materialRef.current?.submit();
        await dieuChinhLuongTonKho.update(id, { ...payload, materials });
        noti("success", SUCCESS_MESSAGE.INVENTORY_ADJUSTMENT.UPDATE);
        setEditId(null);
      }
      refetch();
      onStatusChange(0);
    } catch (error) {
      noti(
        "error",
        status === 2
          ? ERROR_MESSAGE.INVENTORY_ADJUSTMENT.CREATE
          : ERROR_MESSAGE.INVENTORY_ADJUSTMENT.UPDATE
      );
    }
  };

  const onRemove = async () => {
    const allow = await fireDelete();
    if (allow) {
      try {
        await dieuChinhLuongTonKho.remove(selected[0]?.id);
        refetch();
        fireSuccess();
      } catch (error) {
        fireError();
      }
    }
  };
  //#endregion

  useEffect(async () => {
    if (!editId) return;
    dieuChinhLuongTonKho.getById(editId).then((_res) => {
      const { materials, ...editedData } = _res?.data?.data;
      if (editedData) {
        formRef.current.setData({
          ...editedData,
          file_id: editedData?.file,
        });
        setStoreCode(editedData.ware_code);
        onStatusChange(3);
      }
      if (materials?.length > 0) {
        materialRef.current?.getInitMaterials(
          materials.map((e) => ({
            code: e?.material_code,
            name: e?.material_name,
            ware_q: e?.quantity,
            ware_unit: e?.unit,
          }))
        );
      }
    });
  }, [editId]);

  //#region Render
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            warehouses={warehouses}
            filter={params}
            onSearch={onSearch}
          />
        </CCardBody>
      </CCard>
      <CRow>
        <CCol xs="12" sm="12" md="5" lg="5" xl="5">
          <CCard className="bg-light-blue">
            <CCardBody>
              <CCard>
                <CCardBody>
                  <FormInput
                    ref={formRef}
                    onAdd={onAdd}
                    onEdit={onEdit}
                    onRemove={onRemove}
                    onSave={onSave}
                    refetch={refetch}
                    selectedNo={selected.length}
                    status={status}
                    warehouses={warehouses}
                  />
                </CCardBody>
              </CCard>
              <CCard className="mt-2">
                <CCardBody className="px-0">
                  <Table
                    data={data}
                    isSelectAll={isSelectAll}
                    onSelect={onSelect}
                    status={status}
                  />
                </CCardBody>
              </CCard>
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs="12" sm="12" md="7" lg="7" xl="7">
          <CCard className="bg-light-blue">
            <CCardBody>
              <Form ref={materialRef} store_code={store_code} status={status} />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
  //#endregion
};

export default InventoryAdjustment;
