import { useMemo, useRef, useState } from "react";
import { useQuery } from "react-query";

import { comboItemApi } from "src/1/apis/combo_item.api";
import { useSetQueryData } from "src/1/hooks/query";
import { useStateToolbar } from "src/1/hooks/state";

import {
  ComboItemForm,
  ComboItemTable,
  ComboItemToolbar,
} from "../../components";

const ComboItem = () => {
  //#region Data
  const formRef = useRef(null);

  const { status, updateStatus } = useStateToolbar();

  const { data, refetch, isFetching } = useQuery({
    queryKey: ["danh-sach-combo-item"],
    queryFn: () => comboItemApi.getAll(),
    select: (response) =>
      Array.isArray(response) ? response : response?.data?.data,
  });

  const { setQueryData } = useSetQueryData(["danh-sach-combo-item"]);

  const isSelectAll = useMemo(() => data?.every((e) => e.check), [data]);

  const selected = useMemo(() => data?.filter((e) => e.check) ?? [], [data]);
  //#endregion

  //#region Event
  const onSelect = (code, value) => {
    setQueryData(
      data?.map((e) =>
        code === -1 || e.code === code ? { ...e, check: value } : e
      )
    );
  };

  const onAdd = async () => {
    try {
      await formRef.current.addSubmit();
      updateStatus("neutral");
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const onEdit = () => {
    updateStatus("edit");
    formRef.current.edit(selected?.[0]?.id);
  };

  const onSave = async () => {
    try {
      await formRef.current.saveSubmit();
      updateStatus("neutral");
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const onRemove = () => {};
  //#endregion

  //#region Render
  return (
    <>
      <ComboItemToolbar
        canEdit={selected?.length === 1}
        canRemove={selected?.length === 1}
        canAdd={status === "neutral"}
        canSave={status === "edit"}
        onAdd={onAdd}
        onEdit={onEdit}
        onSave={onSave}
        onRemove={onRemove}
      />

      <div className="flex gap-5">
        <div className="basis-2/5">
          <ComboItemTable
            data={data}
            isSelectAll={isSelectAll}
            loading={isFetching}
            onSelect={onSelect}
          />
        </div>
        <div className="basis-3/5">
          <ComboItemForm ref={formRef} />
        </div>
      </div>
    </>
  );
  //#endregion
};
export default ComboItem;
