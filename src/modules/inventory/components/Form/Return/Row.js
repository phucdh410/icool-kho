import { CCheckbox, CInput } from "_components/controls";
import { money } from "src/utils/funcs";

export default ({ data, onSelect }) => {
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
        <CInput value={data?.code} disabled />
      </td>
      <td>
        <CInput value={data?.name} disabled />
      </td>
      <td>
        <CInput value={data?.wareQ} disabled />
      </td>
      <td>
        <CInput value={data?.wareUnit || ""} disabled />
      </td>
      <td>
        <CInput value={money(data?.price)} disabled />
      </td>
      <td>
        <CInput value={money((data?.wareQ || 0) * data?.price)} disabled />
      </td>
      <td>
        <CInput value={data?.reason} disabled />
      </td>
      <td>
        <div className="d-flex">
          {data?.files?.map((f, index) => (
            <span
              key={f?.id + new Date()}
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
