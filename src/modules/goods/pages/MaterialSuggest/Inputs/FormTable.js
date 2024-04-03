import { useMemo } from "react";
import { useFieldArray } from "react-hook-form";
import { CButton } from "src/common/components/controls";
import { CTable } from "src/common/components/others";
import { getAll } from "src/common/queries-fn/store.query";

export const FormTable = ({ control }) => {
  //#region Data
  const { data } = getAll();

  const {
    fields: list,
    append,
    replace,
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

  const onAddAll = () => {
    if (list.length === data?.length) {
      replace([]);
    } else {
      const _codes = data?.map((e) => ({ code: e?.code }));

      replace(_codes);
    }
  };

  const fields = [
    {
      key: "check",
      label: (
        <div>
          <CButton color="text" onClick={onAddAll} style={{ padding: 0 }}>
            Tất cả
          </CButton>
        </div>
      ),
      sorter: false,
    },
    {
      key: "code",
      label: "Mã Chi Nhánh",
      _style: { width: "164px" },
    },
    {
      key: "name",
      label: "Tên Chi Nhánh",
      _style: { width: "auto", minWidth: "200px", textAlign: "left" },
    },
  ];

  const render = {
    check: ({ check, code }) => (
      <td>
        <CButton
          color={check ? "success" : "error"}
          onClick={onAdd(check, code)}
          style={{ padding: 0 }}
        >
          {check ? "Đã thêm" : "Thêm"}
        </CButton>
      </td>
    ),
    name: ({ name }) => <td className="text-left">{name}</td>,
  };
  //#endregion

  //#region Event
  const onAdd = (check, code) => () => {
    if (check) {
      const _index = list.findIndex((e) => e?.code === code);

      remove(_index);
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
