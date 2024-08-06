import { useMemo } from "react";
import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";
import { nhaCungCapApi } from "src/1/apis/nha_cung_cap.api";
import { history } from "src/App";
import {
  CButton,
  CCheckbox,
  CRating,
  CSelect,
  CSelectMulti,
} from "src/common/components/controls";
import { CTable } from "src/common/components/others";

import { FilesCell } from "./FilesCell";

export const FormTable = ({
  control,
  dataTable,
  onlyView = false,
  isSelectedAll,
  onSelectAll,
}) => {
  //#region Data
  const { data: materials_options } = useQuery({
    queryKey: ["danh-sach-nvl"],
    queryFn: () => nguyenVatLieuApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ value: e?.code, label: e?.name })),
  });

  const { data: suppliers_options } = useQuery({
    queryKey: ["danh-sach-nha-cung-cap"],
    queryFn: () => nhaCungCapApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({
        value: e?.code,
        label: e?.name,
        code: e?.code,
      })),
  });

  const { pathname } = useLocation();
  //#endregion

  //#region Event
  const onListChange = (changeCb) => (options) => {
    changeCb(options?.map((opt) => opt?.value));
  };
  //#endregion

  //#region Render
  const fields = [
    {
      key: "select",
      label: <CCheckbox value={isSelectedAll} onChange={onSelectAll} />,
      sorter: false,
    },
    {
      key: "code",
      label: "Mã NCC",
      _style: { minWidth: "190px" },
      sorter: false,
    },
    {
      key: "name",
      label: "Tên NCC",
      _style: { minWidth: "350px" },
      sorter: false,
    },
    {
      key: "financial",
      label: "Năng lực tài chính",
      sorter: false,
      _style: { minWidth: "180px" },
    },
    {
      key: "reputation",
      label: "Uy tín NCC",
      sorter: false,
      _style: { minWidth: "140px" },
    },
    {
      key: "quality",
      label: "Chất lượng",
      sorter: false,
      _style: { minWidth: "140px" },
    },
    {
      key: "branch_review",
      label: "Đánh giá từ chi nhánh",
      sorter: false,
      _style: { minWidth: "140px" },
    },
    {
      key: "customer_review",
      label: "Đánh giá từ khách hàng",
      sorter: false,
      _style: { minWidth: "140px" },
    },
    {
      key: "pricing",
      label: "Giá cả",
      sorter: false,
      _style: { minWidth: "140px" },
    },
    {
      key: "materials",
      label: "Danh sách NVL cung cấp",
      _style: { minWidth: "350px", maxWidth: "450px" },
    },
    {
      key: "files",
      label: "Tài liệu minh chứng",
      _style: { minWidth: "185px" },
      sorter: false,
    },
    ...(onlyView
      ? [
          {
            key: "rating",
            label: "Đánh giá",
            _style: { minWidth: "185px" },
            sorter: false,
          },
        ]
      : []),
  ];

  const render = {
    select: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`suppliers.${index}.selected`}
          render={({ field }) => <CCheckbox {...field} />}
        />
      </td>
    ),
    code: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`suppliers.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              options={suppliers_options ?? []}
              display="code"
              select="value"
              readOnly={onlyView}
            />
          )}
        />
      </td>
    ),
    name: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`suppliers.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              options={suppliers_options ?? []}
              select="value"
              readOnly={onlyView}
            />
          )}
        />
      </td>
    ),
    financial: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.financial`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
    ),
    reputation: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.reputation`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
    ),
    quality: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.quality`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
    ),
    branch_review: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.branch_review`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
    ),
    customer_review: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.customer_review`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
    ),
    pricing: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.pricing`}
            render={({ field }) => <CRating {...field} disabled={onlyView} />}
          />
        </div>
      </td>
    ),
    materials: (record, index) => (
      <td>
        <div className="w-full flex items-center justify-center">
          <Controller
            control={control}
            name={`suppliers.${index}.materials`}
            render={({ field: { onChange, ..._field } }) => (
              <CSelectMulti
                {..._field}
                onChange={onListChange(onChange)}
                className="flex-1"
                options={materials_options ?? []}
                canWrap
                readOnlyText
              />
            )}
          />
        </div>
      </td>
    ),
    files: (record, index) => (
      <FilesCell control={control} index={index} readOnly={onlyView} />
    ),
    rating: ({ id }, index) => (
      <td>
        <CButton
          onClick={() => history.push(`${pathname}/${id}`)}
          className="btn-fill !bg-[#FFB946]"
          icon={<i className="fa-solid fa-flag"></i>}
        >
          Đánh giá
        </CButton>
      </td>
    ),
  };

  return (
    <CTable
      className={classNames(!onlyView && "selectable")}
      fields={onlyView ? fields?.slice(1) : fields}
      render={render}
      data={dataTable}
    />
  );
  //#endregion
};
