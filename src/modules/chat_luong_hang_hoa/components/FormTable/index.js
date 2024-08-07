import { Controller } from "react-hook-form";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";

import { hangHoaApi } from "src/1/apis/hang_hoa.api";
import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";
import { CTable } from "src/1/common/components/others";
import { history } from "src/App";
import {
  CButton,
  CCheckbox,
  CRating,
  CSelect,
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

  const { data: goods_options } = useQuery({
    queryKey: ["danh-sach-hang-hoa"],
    queryFn: () => hangHoaApi.getAll(),
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
                name={`goods.${index}.selected`}
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
          name={`goods.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              className="w-full"
              options={goods_options ?? []}
              display="code"
              select="value"
              readOnly={onlyView}
            />
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
          name={`goods.${index}.code`}
          render={({ field }) => (
            <CSelect
              {...field}
              className="w-full"
              options={goods_options ?? []}
              select="value"
              readOnly={onlyView}
            />
          )}
        />
      ),
    },
    {
      key: "quality",
      label: "Chất lượng",
      style: { minWidth: 180 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`goods.${index}.quality`}
          render={({ field }) => <CRating {...field} disabled={onlyView} />}
        />
      ),
    },
    {
      key: "weight",
      label: "Trọng lượng",
      style: { minWidth: 140 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`goods.${index}.weight`}
          render={({ field }) => <CRating {...field} disabled={onlyView} />}
        />
      ),
    },
    {
      key: "size",
      label: "Kích thước",
      style: { minWidth: 140 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`goods.${index}.size`}
          render={({ field }) => <CRating {...field} disabled={onlyView} />}
        />
      ),
    },
    {
      key: "color",
      label: "Màu sắc",
      style: { minWidth: 140 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`goods.${index}.color`}
          render={({ field }) => <CRating {...field} disabled={onlyView} />}
        />
      ),
    },
    {
      key: "smell",
      label: "Mùi vị",
      style: { minWidth: 140 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`goods.${index}.smell`}
          render={({ field }) => <CRating {...field} disabled={onlyView} />}
        />
      ),
    },
    {
      key: "customer_review",
      label: "Đánh giá từ\nkhách hàng",
      style: { minWidth: 140 },
      cellRender: (value, record, index) => (
        <Controller
          control={control}
          name={`goods.${index}.customer_review`}
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
          name={`goods.${index}.pricing`}
          render={({ field }) => <CRating {...field} disabled={onlyView} />}
        />
      ),
    },
    // {
    //   key: "materials",
    //   label: "Danh sách NVL cung cấp",
    //   style: { minWidth: 350 },
    //   cellRender: (value, record, index) => (
    //     <Controller
    //       control={control}
    //       name={`goods.${index}.materials`}
    //       render={({ field: { onChange, ..._field } }) => (
    //         <CSelectMulti
    //           {..._field}
    //           onChange={onListChange(onChange)}
    //           className="flex-1"
    //           options={materials_options ?? []}
    //           canWrap
    //           readOnlyText={onlyView}
    //         />
    //       )}
    //     />
    //   ),
    // },
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
