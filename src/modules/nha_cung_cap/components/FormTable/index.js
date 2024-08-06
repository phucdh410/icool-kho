import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";
import { CTable } from "src/1/common/components/others";
import { history } from "src/App";
import {
  CButton,
  CCheckbox,
  CInput,
  CRating,
  CSelectMulti,
} from "src/common/components/controls";

import { FilesCell } from "./FilesCell";

export const FormTable = ({
  control,
  dataTable = [],
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

  const { pathname } = useLocation();
  //#endregion

  //#region Event
  const onListChange = (changeCb) => (options) => {
    changeCb(options?.map((opt) => opt?.value));
  };
  //#endregion

  //#region Render
  const headers = [
    ...(!onlyView
      ? [
          {
            key: "selected",
            label: "",
            style: { minWidth: 50 },
            render: () => (
              <CCheckbox
                value={isSelectedAll}
                onChange={onSelectAll}
                disabled={onlyView}
              />
            ),
            cellRender: (value, record, index) => (
              <Controller
                control={control}
                name={`suppliers.${index}.selected`}
                render={({ field }) => <CCheckbox {...field} value={value} />}
              />
            ),
          },
        ]
      : []),
    {
      key: "code",
      label: "Mã NCC",
      style: { minWidth: 190 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`suppliers.${index}.code`}
          render={({ field }) => (
            <CInput {...field} className="w-full" readOnly={onlyView} />
          )}
        />
      ),
    },
    {
      key: "name",
      label: "Tên NCC",
      align: "left",
      style: { minWidth: 350 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`suppliers.${index}.name`}
          render={({ field }) => (
            <CInput {...field} className="w-full" readOnly={onlyView} />
          )}
        />
      ),
    },
    {
      key: "financial",
      label: "Năng lực tài chính",
      style: { minWidth: 180 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`suppliers.${index}.financial`}
          render={({ field }) => <CRating {...field} disabled={onlyView} />}
        />
      ),
    },
    {
      key: "reputation",
      label: "Uy tín NCC",
      style: { minWidth: 140 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`suppliers.${index}.reputation`}
          render={({ field }) => <CRating {...field} disabled={onlyView} />}
        />
      ),
    },
    {
      key: "quality",
      label: "Chất lượng",
      style: { minWidth: 140 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`suppliers.${index}.quality`}
          render={({ field }) => <CRating {...field} disabled={onlyView} />}
        />
      ),
    },
    {
      key: "pricing",
      label: "Giá cả",
      style: { minWidth: 140 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`suppliers.${index}.pricing`}
          render={({ field }) => <CRating {...field} disabled={onlyView} />}
        />
      ),
    },
    {
      key: "materials",
      label: "Danh sách NVL cung cấp",
      style: { minWidth: 350 },
      cellRender: (value, record, index) => (
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
              readOnlyText={onlyView}
            />
          )}
        />
      ),
    },
    {
      key: "files",
      label: "Tài liệu minh chứng",
      style: { minWidth: 185 },
      cellRender: (value, record, index) => (
        <FilesCell control={control} index={index} readOnly={onlyView} />
      ),
    },
    ...(onlyView
      ? [
          {
            key: "rating",
            label: "Đánh giá",
            style: { minWidth: 160 },
            cellRender: (value, record, index) => (
              <CButton
                onClick={() => history.push(`${pathname}/${record?.id}`)}
                className="btn-fill !bg-[#FFB946]"
                icon={<i className="fa-solid fa-flag"></i>}
              >
                Đánh giá
              </CButton>
            ),
          },
        ]
      : []),
  ];
  return (
    <CTable
      rowKey="__id"
      headers={headers}
      headerMultiline
      data={dataTable}
      headerTransform="capitalize"
    />
  );
  //#endregion
};
