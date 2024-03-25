import { useMemo } from "react";
import { useFieldArray } from "react-hook-form";
import { CButton, CSelect } from "src/common/components/controls";
import { CTable } from "src/common/components/others";
import { getAll } from "src/common/queries-fn/store.query";

const MOCK = [
  { code: "UVK", name: "Ung Văn Khiêm" },
  { code: "XVNT", name: "Xô Viết Nghệ Tĩnh" },
  { code: "TN", name: "Trần Não" },
  { code: "MDC", name: "Mạc Đỉnh Chi" },
  { code: "CCY", name: "Cầu Chữ Y" },
  { code: "DBT", name: "Dương Bá Trạc" },
];

export const FormTable = ({ control }) => {
  //#region Data
  const { data } = getAll();

  const {
    fields: list,
    append,
    remove,
  } = useFieldArray({ control, name: "listStores", keyName: "_id" });

  const tableData = useMemo(() => {
    const _list = list.map((e) => e?.code);
    return (
      data?.map((e) => ({
        code: e?.code,
        name: e?.name,
        check: _list.includes(e?.code),
      })) || []
    );
  }, [list, data]);

  const fields = [
    {
      key: "check",
      label: <div></div>,
      sorter: false,
    },
    {
      key: "code",
      label: "Mã Chi Nhánh",
      _style: { minWidth: "175px" },
    },
    {
      key: "name",
      label: "Tên Chi Nhánh",
      _style: { width: "auto", minWidth: "200px", textAlign: "center" },
    },
  ];

  const render = {
    check: ({ check, code }) => (
      <td>
        <CButton
          color={check ? "success" : "error"}
          onClick={onAdd(check, code)}
        >
          {check ? "Đã thêm" : "Thêm"}
        </CButton>
      </td>
    ),
  };
  //#endregion

  //#region Event
  const onAdd = (check, code) => () => {
    if (check) {
      const _index = list.findIndex((e) => e === code);
      _index && remove(_index);
    } else {
      append({ code });
    }
  };
  //#endregion

  //#region Render
  return (
    <>
      <CTable
        className="selectable"
        data={tableData}
        page={1}
        itemsPerPage={9999}
        fields={fields}
        render={render}
      />
    </>
  );
  //#endregion
};
