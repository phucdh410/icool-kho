import { useState, useCallback, useMemo } from "react";

import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";

import { CCard, CCardHeader, CCardBody } from "@coreui/react";

import Table from "./Table";
import Toolbar from "./Toolbar";

import {
  approver,
  getAll,
} from "_common/queries-fn/purchase-proposal-form.query";

import { approve, confirm, remove } from "src/apis/purchase_proposal_form.api";

import { history } from "src/App";
import { fireDelete, fireSuccess } from "src/utils/alert";
import { isCentral, isSuccess } from "src/utils/funcs";
import { NAME } from "../../reducers/purchase-proposal-form";
import { setFilter } from "src/common/actions/config.action";

export const MOCK_DATA = [
  {
    id: "7c00b939-b214-49ed-bcbf-eba4a9aa0cb7",
    code: "IN000001",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:08:09.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 0,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "c40af7d5-6462-4bd9-a205-6d1858554c18",
    code: "IN000002",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:07:44.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 0,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "af26c979-aa20-468b-96f2-5a9d4df9f389",
    code: "IN000003",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:07:42.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 0,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "07422563-2f39-46c6-9ba4-3a58101818ff",
    code: "IN000004",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:07:40.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 0,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "b4492ecc-5b0b-46fb-bd2e-7ce4d92cf3fc",
    code: "IN000005",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:07:33.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 0,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "8f6f1db6-2839-4020-9b0f-b3c38a4f0833",
    code: "IN000006",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:07:32.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 0,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "56db82da-7637-4ec1-854c-2e9f5479c552",
    code: "IN000007",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:07:31.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 1,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "72569d14-00d3-47ac-93d0-f04833e4f70a",
    code: "IN000008",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:07:29.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 1,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "46d1ce28-8298-415d-ac1e-7f4238ef03cf",
    code: "IN000009",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:07:28.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 2,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "54467226-50e1-4a73-b615-813dfd17d37e",
    code: "IN000010",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:07:27.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 2,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "524a2f28-1bf9-48a2-9239-935913b57312",
    code: "IN000011",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:07:07.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 1,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "1856aea4-d887-422f-ab6d-583d06f3c3a0",
    code: "IN000012",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:07:05.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 1,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "a6ba6fc7-337c-48e0-91c4-e99702b2f8d0",
    code: "IN000013",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:06:29.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 0,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "d6c42fa7-1f72-45d4-8860-0a9322089fa5",
    code: "IN000014",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T14:06:27.000Z",
    createdBy: "B0962721-61F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Minh Thảo",
    status: 1,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
  {
    id: "b81c7d9b-5760-4204-a86e-0ff1178982b6",
    code: "IN000015",
    storeName: "ICOOL Ung Văn Khiêm",
    createdDate: "2023-10-06T10:01:52.000Z",
    createdBy: "A9860C55-62F0-E711-80DA-00155D0A0504",
    creator: "Nguyễn Thị Quỳnh Như",
    status: 1,
    note: "Bổ sung rau hư hỏng, bổ sung bánh còn thiếu,  vận chuyển thiếu",
  },
];

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

  const { data, set, refetch } = getAll(filters, isLoading, {
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

  const onAdd = useCallback(() => history.push());

  const onEdit = useCallback(() => {
    if (selected.length === 1)
      history.push(`/solution/form/${selected[0].code}`);
  });

  const onApprove = useCallback((status) => async () => {
    setFetching(true);
    const res = await mutation.mutateAsync({
      code: selected.map((s) => s.code),
      status,
    });

    if (isSuccess(res)) {
      noti("success", res.message);
      refetch();
    } else {
      setFetching(false);
    }
  });

  const onRemove = useCallback(async () => {
    const allow = await fireDelete();
    if (allow) {
      const res = await remove(selected.map((s) => s.code));

      if (isSuccess(res)) {
        refetch();
        fireSuccess();
      } else {
        fireError();
      }
    }
  }, [selected, refetch]);
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
            onApprove={onApprove}
            onRemove={onRemove}
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
            data={MOCK_DATA || data}
            onSelect={select}
          />
        </CCardBody>
      </CCard>
    </>
  );
};

export default QuantitativeListPage;
