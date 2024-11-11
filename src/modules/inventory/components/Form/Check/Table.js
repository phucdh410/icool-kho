import React from "react";

import { money } from "src/utils/funcs";

import { getAllUnCheckByStore } from "_common/queries-fn/material.query";
import { CCheckbox } from "_components/controls";

import InputRow from "./InputRow";
import Row from "./Row";

export default ({
  store_code,
  date,
  amounts,
  data = [],
  inputData,
  isSelectAll,
  onAmountChange,
  onInputRowChange,
  onChange,
  quantity,
  total,
}) => {
  const { data: materials } = getAllUnCheckByStore(
    { store_code, date },
    !store_code
  );

  const change = (_data) => {
    if (_data.code === "") return;
    if (_data.wareQ === "") delete amounts[_data.code];
    else {
      if (_data.wareQ == amounts[_data.code]?.wareQ) return;

      amounts[_data.code] = { ..._data };

      onAmountChange({ ...amounts });
    }
  };

  const inputChange = (id) => (_data) => {
    onInputRowChange(
      inputData.map((d) => (d.id === id ? { ..._data, ...d } : d))
    );
    change(_data);
  };

  const selectAll = (v) => {
    onChange(data.map((d) => ({ ...d, check: v })));
    onInputRowChange(inputData.map((d) => ({ ...d, check: v })));
  };

  const select = (index) => (v) => {
    const _new = [...data];

    _new[index] = { ..._new[index], check: v };

    onChange(_new);
  };

  const selectInput = (id) => (v) => {
    const _new = [...inputData];

    const _find = _new.find((n) => n.id === id);
    _find.check = v;

    onInputRowChange(_new);
  };

  return (
    <table className="table table-hover border c-table selectable">
      <thead>
        <tr>
          <th
            style={{ width: "50px", paddingLeft: "20px", paddingRight: "24px" }}
          >
            <CCheckbox value={isSelectAll} onChange={selectAll} />
          </th>
          <th
            style={{ width: "250px", minWidth: "250px", paddingRight: "24px" }}
          >
            Mã NVL
          </th>
          <th
            style={{ width: "auto", minWidth: "250px", paddingRight: "24px" }}
          >
            Tên NVL
          </th>
          <th
            style={{ width: "150px", minWidth: "150px", paddingRight: "24px" }}
          >
            ĐVT
          </th>
          <th
            style={{ width: "200px", minWidth: "200px", paddingRight: "24px" }}
          >
            Số lượng
          </th>
          <th
            style={{ width: "200px", minWidth: "200px", paddingRight: "24px" }}
          >
            Đơn giá
          </th>
          <th
            style={{ width: "200px", minWidth: "200px", paddingRight: "24px" }}
          >
            Thành tiền
          </th>
        </tr>
      </thead>
      <tbody>
        {inputData.map((m, index) => (
          <InputRow
            key={`_${m.id}}`}
            amounts={amounts}
            materials={materials?.map((d) => ({
              value: d.code,
              data: d,
              label: d.name,
            }))}
            data={m}
            onChange={inputChange(m.id)}
            onSelect={selectInput(m.id)}
          />
        ))}
        {data &&
          data.map((m, index) => (
            <Row
              key={m.id}
              amount={amounts[m.code] || {}}
              data={m}
              onChange={change}
              onSelect={select(index)}
            />
          ))}
        <tr>
          <td colSpan={3}></td>
          <td>
            <span className="font-weight-bold">Tổng</span>
          </td>
          <td>
            <span className="font-weight-bold">{money(quantity)}</span>
          </td>
          <td></td>
          <td>
            <span className="font-weight-bold">{money(total)}</span>
          </td>
        </tr>
      </tbody>
    </table>
  );
};
