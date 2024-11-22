import { useFieldArray } from "react-hook-form";

import { CButton } from "src/common/components/controls";
import { CTable } from "src/common/components/others";
import { mapWeekday } from "src/modules/menu/funcs";
import { money } from "src/utils/funcs";

export const MenuTable = ({ fieldsForm, onRemove }) => {
  //#region Data
  //#endregion

  //#region Render
  const fields = [
    {
      key: "index",
      label: "STT",
    },
    {
      key: "name",
      label: "TÊN MENU",
      _style: { textAlign: "left" },
    },
    {
      key: "price",
      label: "GIÁ TRONG MENU",
    },
    {
      key: "from",
      label: "TỪ THỨ",
    },
    {
      key: "to",
      label: "ĐẾN THỨ",
    },
    {
      key: "action",
      label: "",
    },
  ];

  const render = {
    index: (item, index) => <td>{index + 1}</td>,
    name: ({ name }) => <td className="text-left">{name}</td>,
    price: ({ normal_price, holiday_price, normal_or_holiday }) => (
      <td>{money(normal_or_holiday ? holiday_price : normal_price)}</td>
    ),
    from: ({ from }) => <td>{mapWeekday(from)}</td>,
    to: ({ to }) => <td>{mapWeekday(to)}</td>,
    action: (item, index) => (
      <td>
        <button
          onClick={onRemove(index)}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full !outline-none !border-none hover:bg-slate-100 hover:bg-opacity-50"
        >
          <i className="fa-solid fa-trash-can text-xl text-[#db3e29]"></i>
        </button>
      </td>
    ),
  };

  return <CTable fields={fields} data={fieldsForm} render={render} />;
  //#endregion
};
