import { useState, useCallback, useMemo, useRef } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import Table from "./Table";
import Toolbar from "./Toolbar";

import {
  approver,
  getAllQuantitative,
} from "_common/queries-fn/purchase-proposal-form.query";

import {
  approve,
  confirm,
  removeQuantitative,
  handleQuantitative,
} from "src/apis/purchase_proposal_form.api";

import { fireError, fireSuccess } from "src/utils/alert";
import { isCentral, isSuccess } from "src/utils/funcs";
import { NAME } from "../../reducers/purchase-proposal-form";
import { setFilter } from "src/common/actions/config.action";

import { MQuantitativeDialog } from "./Dialog";
import { format } from "src/utils/moment";

const selectData = createSelector(
  (state) => state.config,
  (state) => state.auth,
  (state) => state.purchaseProposalForm,
  ({ isLoading }, { storeCode }, { filters }) => ({
    isLoading,
    storeCode,
    filters,
  })
);

const QuantitativeListPage = ({}) => {
  const dispatch = useDispatch();
  //#region Data
  const { isLoading, storeCode, filters } = useSelector(selectData);

  const [isFetching, setFetching] = useState();

  const [status, setStatus] = useState(1);

  const { data, set, refetch } = getAllQuantitative(filters, isLoading, {
    onSuccess: () => setFetching(false),
  });

  const mutation = approver(isCentral(storeCode) ? confirm : approve);

  const isSelectAll = useMemo(
    () => data?.every((d) => d.status || d.check),
    [data]
  );

  const selected = useMemo(
    () => (isFetching ? [] : data?.filter((d) => !d.status && d.check) || []),
    [isFetching, data]
  );

  const modalRef = useRef(null);
  //#endregion

  //#region Event
  const select = useCallback(
    (code, v) =>
      set(
        data?.map((d) =>
          d.status !== 2 && (code === -1 || d.code === code)
            ? { ...d, check: v }
            : d
        )
      ),
    [data]
  );

  const onStatusChange = useCallback(
    (_status) => setStatus(_status === status ? 0 : _status),
    [status]
  );

  const onSearch = useCallback(
    (data) => dispatch(setFilter(NAME, data)),
    [dispatch]
  );

  const onAdd = () => {
    modalRef.current?.open();
  };

  const onEdit = () => {
    if (selected.length === 1) {
      modalRef.current?.open(selected[0]);
    }
  };

  const onRemove = async () => {
    if (selected.length === 1) {
      const res = await removeQuantitative(selected[0]?.id);
      if (isSuccess(res)) {
        fireSuccess("Thành công", "Xóa thành công!");
        refetch();
      } else {
        fireError("Lỗi", "Xóa không thành công!");
      }
    }
  };

  const onReCalculate = async () => {
    const values = {
      storeCode: selected[0]?.store_code,
      date: format(selected[0]?.updated_date, "YYYY-MM-DD"),
      note: selected[0]?.note,
    };

    const res = await handleQuantitative(values);

    if (isSuccess(res)) {
      fireSuccess("Thành công", "Cập nhật định lượng thành công!");
      refetch();
    } else {
      fireError("Lỗi", "Cập nhật định lượng không thành công!");
    }
  };
  //#endregion

  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <Toolbar
            isApproving={mutation.isLoading}
            isLoading={isFetching}
            filter={filters}
            status={status}
            selectedNo={selected.length}
            toggleStatus={onStatusChange}
            onSearch={onSearch}
            onAdd={onAdd}
            onEdit={onEdit}
            onRemove={onRemove}
            onReCalculate={onReCalculate}
          />
        </CCardBody>
      </CCard>
      <CCard>
        {/* aaaaaa */}
        <CCardHeader></CCardHeader>
        <CCardBody className="px-0 pt-0">
          <Table
            loading={isLoading}
            isSelectAll={isSelectAll}
            data={data}
            onSelect={select}
          />
        </CCardBody>
      </CCard>
      <MQuantitativeDialog ref={modalRef} refetch={refetch} />
    </>
  );
};

export default QuantitativeListPage;
