import { CCheckbox } from "_components/controls";
import { PERMISSION_VALUE } from "_configs/constant";

export default ({ code, name, value, onChange }) => {
  return (
    <tr>
      <td className="text-left">{name}</td>
      <td className="px-0">
        <CCheckbox
          className="mx-auto"
          value={PERMISSION_VALUE.READ & value}
          onChange={onChange(code, PERMISSION_VALUE.READ)}
        />
      </td>
      <td className="px-0">
        <CCheckbox
          className="mx-auto"
          value={PERMISSION_VALUE.EXPORT & value}
          onChange={onChange(code, PERMISSION_VALUE.EXPORT)}
        />
      </td>
    </tr>
  );
};
