import { Controller, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";

import { CCard, CCardBody } from "@coreui/react";

import {
  CRange,
  CRating,
  CSwitch,
  CTextarea,
} from "src/common/components/controls";
import { CTable } from "src/common/components/others";

import { renderRating } from "../../funcs";

export const MarkTable = ({ control }) => {
  //#region Data
  const user = useSelector((state) => state.auth.user);

  const { fields: fieldsForm } = useFieldArray({
    control,
    name: "cai_array",
    keyName: "__id",
  });
  //#endregion

  //#region Render
  const fields = [
    { key: "tieu_chi", label: "Tiêu chí", sorter: false },
    { key: "muc_do", label: "Mức độ đánh giá", sorter: false },
    { key: "danh_gia_ktt", label: "Đánh giá KTT", sorter: false },
    { key: "note_danh_gia_ktt", label: "Ghi chú đánh giá KTT", sorter: false },
    { key: "danh_gia_cheo", label: "Ghi chú đánh giá chéo", sorter: false },
    { key: "note_danh_gia_cheo", label: "Ghi chú đánh giá KTT", sorter: false },
    ...(user?.operator
      ? [
          {
            key: "note_bgd",
            label: "Ghi chú của BGĐ",
            sorter: false,
          },
          {
            key: "danh_gia_bgd",
            label: "Đánh giá của BGĐ",
            sorter: false,
          },
        ]
      : []),
  ];

  const render = {
    tieu_chi: ({ name }, index) => (
      <td>
        <div className="flex flex-col gap-4">
          <h5 className="font-semibold">{name}</h5>
          <Controller
            control={control}
            name={`cai_array.${index}.tieu_chi`}
            render={({ field }) => <CRange {...field} />}
          />
        </div>
      </td>
    ),
    muc_do: ({ tieu_chi }) => <td>{renderRating(tieu_chi)}</td>,
    danh_gia_ktt: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`cai_array.${index}.danh_gia_ktt`}
          render={({ field }) => <CRating {...field} />}
        />
      </td>
    ),
    note_ktt: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`cai_array.${index}.note_ktt`}
          render={({ field }) => <CTextarea {...field} />}
        />
      </td>
    ),
    danh_gia_cheo: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`cai_array.${index}.danh_gia_cheo`}
          render={({ field }) => <CRating {...field} />}
        />
      </td>
    ),
    note_danh_gia_cheo: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`cai_array.${index}.note_danh_gia_cheo`}
          render={({ field }) => <CTextarea {...field} />}
        />
      </td>
    ),
    note_bgd: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`cai_array.${index}.note_bgd`}
          render={({ field }) => <CTextarea {...field} />}
        />
      </td>
    ),
    danh_gia_bgd: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`cai_array.${index}.danh_gia_bgd`}
          render={({ field }) => <CSwitch {...field} />}
        />
      </td>
    ),
  };

  return (
    <>
      <CCard>
        <CCardBody>
          <CTable fields={fields} render={render} data={fieldsForm} />
        </CCardBody>
      </CCard>
      <CCard>
        <CCardBody>
          <div className="flex flex-row justify-between">
            <h5>Chốt cuối cùng của BGĐ</h5>
            <Controller
              control={control}
              name="final_note"
              render={({ field }) => <CTextarea {...field} />}
            />
            <span>Quyết định</span>
            <Controller
              control={control}
              name="decision"
              render={({ field }) => <div>Radio button</div>}
            />
          </div>
        </CCardBody>
      </CCard>
    </>
  );
  //#endregion
};
