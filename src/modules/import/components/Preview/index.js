import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { CCard, CCardBody, CRow, CCol } from "@coreui/react";
import { CInput, CSelect } from "_components/controls";
import { CDialog, CLoading, CTable, CPagination } from "_components/others";

import { format } from "src/utils/moment";
import { money } from "src/utils/funcs";

export default ({ item, getter, onClose }) => {
	const ref = useRef();
	const { data, isLoading } = getter(item);
	const [paginate, setPaginate] = useState({ page: 1, limit: 10 });
	const [filter, setFilter] = useState("all");

	const onPaginationChange = useCallback(
		(_paginate) => setPaginate(_paginate),
		[]
	);

	const groupKeys = useMemo(() => {
		if (!data?.groups) return [{ value: "all", label: "Tất cả" }];

		return [
			{ value: "all", label: "Tất cả" },
			...Object.keys(data?.groups).map((v) => ({
				value: v,
				label: `Nhóm ${v}`,
			})),
		];
	}, [data]);

	const materials = useMemo(() => {
		if (!data) return [];

		if (filter === "all") return data.materials;

		return data.materials.filter((v) => data.groups[filter].includes(v.code));
	}, [data, filter]);

	useEffect(() => {
		if (!data) setFilter("all");
	}, [data]);

	const fields = [
		{
			key: "code",
			label: "Mã MH",
			_style: { width: "150px", minWidth: "150px" },
		},
		{
			key: "name",
			label: "Tên MH",
			_style: { width: "350px", minWidth: "350px", textAlign: "left" },
		},
		{
			key: "boughtQ",
			label: "Số lượng",
			_style: { width: "150px", minWidth: "150px" },
		},
		{
			key: "boughtUnit",
			label: "ĐVT",
			_style: { width: "150px", minWidth: "150px" },
		},
		{
			key: "total",
			label: "Thành tiền",
			_style: { width: "150px", minWidth: "150px" },
		},
	];
	const render = {
		name: ({ name }) => <td className="text-left">{name}</td>,
		total: ({ total }) => <td className="text-right">{money(total)}</td>,
	};

	return (
		<CDialog
			title={`Phiếu nhập hàng ${data?.code || "LOADING..."}`}
			show={true}
			onClose={onClose}
		>
			<CLoading loading={isLoading}>
				<CCard>
					<CCardBody>
						<CRow>
							<CCol xs="12" innerRef={ref}>
								<CSelect
									options={groupKeys}
									label="Nhóm Nguyên Vật Liệu"
									menuPortalTarget={document.body}
									menuPlacement="auto"
									value={filter}
									onChange={({ value }) => setFilter(value)}
								/>
							</CCol>
							<CCol xs="12" sm="6" md="6" lg="3" xl="3" xxl="3">
								<CInput readOnly label="Mã phiếu" value={data?.code} />
							</CCol>
							<CCol xs="12" sm="6" md="6" lg="3" xl="3" xxl="3">
								<CInput readOnly label="Chi nhánh" value={data?.storeName} />
							</CCol>
							<CCol xs="12" sm="4" md="4" lg="3" xl="3" xxl="3">
								<CInput
									readOnly
									label="Ngày trả"
									value={data ? format(data.date) : ""}
								/>
							</CCol>
							<CCol xs="12" sm="4" md="4" lg="5" xl="3" xxl="3">
								<CInput readOnly label="Tổng tiền" value={money(data?.total)} />
							</CCol>
							<CCol xs="12" sm="4" md="4" lg="5" xl="4" xxl="4">
								<CInput
									readOnly
									label="Số điện thoại"
									value={data?.storePhone}
								/>
							</CCol>
							<CCol xs="12" sm="8" md="4" lg="5" xl="8" xxl="8">
								<CInput readOnly label="Địa chỉ" value={data?.storeAddress} />
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
							loading={isLoading}
							data={materials ?? []}
							page={paginate.page}
							itemsPerPage={paginate.limit}
							fields={fields}
							render={render}
							footer={
								<CPagination
									page={paginate.page}
									total={materials.length}
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
};
