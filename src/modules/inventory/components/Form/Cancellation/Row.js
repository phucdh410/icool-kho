import React, { useEffect, useMemo } from "react";

import { CCheckbox, CInput } from "_components/controls";
import { useForm } from "react-hook-form";
import { money } from "src/utils/funcs";

export default ({ data, warehouse, onSelect }) => {
  //#region Data
  const { watch, setValue } = useForm({
    defaultValues: data,
  });

  // const status = useMemo(
  //   () =>
  //     data.approvedStatus ? (
  //       data.responsible == 2 ? (
  //         <span className="text-success font-weight-bold">Kho trung tâm</span>
  //       ) : (
  //         <span className="text-success font-weight-bold">{warehouse}</span>
  //       )
  //     ) : (
  //       <span className="text-danger font-weight-bold">Chưa xác nhận</span>
  //     ),
  //   [data.approvedStatus, warehouse]
  // );
  //#endregion

  //#region Event
  const onFileClick = (file, image) => {};

  //#endregion

  useEffect(() => setValue("reason", data.reason), [data.reason]);

  //#region Render
  return (
    <tr>
      <td>
        <CCheckbox
          value={data.check}
          onChange={onSelect}
          disabled={data.approvedStatus}
        />
      </td>
      <td>
        <CInput value={watch("code")} disabled />
      </td>
      <td>
        <CInput value={watch("name")} disabled />
      </td>
      <td>
        <CInput value={watch("wareQ")} disabled />
      </td>
      <td>
        <CInput value={watch("wareUnit") || ""} disabled />
      </td>
      <td>
        <CInput value={money(watch("price"))} disabled />
      </td>
      <td>
        <CInput
          value={money((watch("wareQ") || 0) * watch("price"))}
          disabled
        />
      </td>
      {/* <td>{status}</td> */}
      <td>
        <CInput value={watch("reason")} disabled />
      </td>
      <td>
        <div className="d-flex">
          {watch("files")?.map((f, index) => (
            <span
              className="c-icon file"
              style={{ cursor: "pointer" }}
              onClick={() => onFileClick(f, index)}
            ></span>
          ))}
        </div>
      </td>
    </tr>
  );
  //#endregion
};
