import { Controller, useFieldArray } from "react-hook-form";
import { useSelector } from "react-redux";

import { CCard, CCardBody } from "@coreui/react";

import {
  CRadio,
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
    name: "evaluations",
    keyName: "__id",
  });
  //#endregion

  //#region Render
  const fields = [
    { key: "percent", label: "Tiêu chí", sorter: false },
    { key: "muc_do", label: "Mức độ đánh giá", sorter: false },
    { key: "ware_evaluation", label: "Đánh giá KTT", sorter: false },
    { key: "ware_note", label: "Ghi chú đánh giá KTT", sorter: false },
    { key: "peer_evaluation", label: "Đánh giá chéo", sorter: false },
    { key: "peer_note", label: "Ghi chú đánh giá chéo", sorter: false },
    // ...(user?.operator
    ...(true
      ? [
          {
            key: "operator_note",
            label: "Ghi chú của BGĐ",
            sorter: false,
          },
          {
            key: "operator_choice",
            label: "Đánh giá của BGĐ",
            sorter: false,
          },
        ]
      : []),
  ];

  const render = {
    percent: ({ label }, index) => (
      <td>
        <div className="flex flex-col gap-1">
          <h5 className="font-semibold text-base text-left mb-0">{label}</h5>
          <Controller
            control={control}
            name={`evaluations.${index}.percent`}
            render={({ field }) => (
              <CRange
                {...field}
                fillColor={
                  field.value >= 85
                    ? "#28a745"
                    : field.value < 70
                    ? "#dc3545"
                    : "#FFB946"
                }
              />
            )}
          />
        </div>
      </td>
    ),
    muc_do: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`evaluations.${index}.percent`}
          render={({ field }) => renderRating(field.value)}
        />
      </td>
    ),
    ware_evaluation: (record, index) => (
      <td>
        <div className="flex w-full items-center justify-center">
          <Controller
            control={control}
            name={`evaluations.${index}.ware_evaluation`}
            render={({ field }) => <CRating {...field} />}
          />
        </div>
      </td>
    ),
    ware_note: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`evaluations.${index}.ware_note`}
          render={({ field }) => <CTextarea {...field} />}
        />
      </td>
    ),
    peer_evaluation: (record, index) => (
      <td>
        <div className="flex w-full items-center justify-center">
          <Controller
            control={control}
            name={`evaluations.${index}.peer_evaluation`}
            render={({ field }) => <CRating {...field} />}
          />
        </div>
      </td>
    ),
    peer_note: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`evaluations.${index}.peer_note`}
          render={({ field }) => <CTextarea {...field} />}
        />
      </td>
    ),
    operator_note: (record, index) => (
      <td>
        <Controller
          control={control}
          name={`evaluations.${index}.operator_note`}
          render={({ field }) => <CTextarea {...field} />}
        />
      </td>
    ),
    operator_choice: (record, index) => (
      <td>
        <div className="flex w-full items-center justify-center">
          <Controller
            control={control}
            name={`evaluations.${index}.operator_choice`}
            render={({ field }) => <CSwitch {...field} />}
          />
        </div>
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
      {/* {user?.operator && ( */}
      {true && (
        <CCard>
          <CCardBody>
            <div className="flex flex-row items-center gap-10">
              <h5 className="mb-0">Chốt cuối cùng của BGĐ</h5>
              <Controller
                control={control}
                name="final_note"
                render={({ field }) => (
                  <CTextarea className="min-w-[450px]" {...field} />
                )}
              />
              <h5 className="mb-0">Quyết định</h5>
              <Controller
                control={control}
                name="decision"
                render={({ field }) => (
                  <CRadio
                    direction="horizontal"
                    options={[
                      { value: "0", label: "Không chọn" },
                      { value: "1", label: "Chọn" },
                    ]}
                    {...field}
                  />
                )}
              />
            </div>
          </CCardBody>
        </CCard>
      )}
    </>
  );
  //#endregion
};
