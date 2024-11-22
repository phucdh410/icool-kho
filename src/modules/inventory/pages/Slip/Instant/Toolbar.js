import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { createSelector } from "reselect";

import { CCol, CCollapse, CRow } from "@coreui/react";

import { history } from "src/App";
import { filter as filterFn } from "src/utils/funcs";

import { Magnifying } from "_assets/icons";
import { CButton, CInput, CSelect } from "_components/controls";
import { CActionGroup } from "_components/others";

import { getAll as getAllGroup } from "../../../queries-fn/material-group.query";

const selectIsLoading = createSelector(
  (state) => state.config,
  ({ isLoading }) => isLoading
);

const CHECH_LECH_OPTIONS = [
  { value: 1, label: "Có" },
  { value: 0, label: "Không" },
];

export default ({
  filter,
  status,
  selectedNo,
  toggleStatus,
  onSearch,
  onAdjust,
}) => {
  //#region Data
  const isLoading = useSelector(selectIsLoading);
  const { control, handleSubmit } = useForm({
    defaultValues: filter,
  });

  const { data: groups } = getAllGroup({}, isLoading);
  //#endregion

  //#region Event
  const toggleCollapse = () => toggleStatus(1);

  const search = handleSubmit(
    (d) => onSearch(filterFn(d)),
    (e) => noti("error", e)
  );

  const onClick = (state) => {
    switch (state) {
      case "print":
        return history.push();
    }
  };
  //#endregion

  return (
    <>
      <CRow>
        <CCol xs="12" className="action">
          <div>
            <CActionGroup
              onClick={onClick}
              canAdd={false}
              canSave={false}
              canEdit={false}
              canRemove={false}
            />
          </div>
          <div
            className={classNames(
              "btn",
              "btn-primary",
              "btn-collapse",
              status == 1 && "show"
            )}
            onClick={toggleCollapse}
          ></div>
        </CCol>
      </CRow>

      <CCollapse show={status === 1}>
        <div className="mt-3 flex flex-row items-end justify-between">
          <div className="flex gap-6 flex-row">
            <div className="min-w-[300px]">
              <Controller
                name="groupCode"
                control={control}
                render={({ field }) => (
                  <CSelect
                    label="Nhóm hàng"
                    options={groups}
                    optionAll
                    {...field}
                    onChange={(v) => field.onChange(v.value)}
                  />
                )}
              />
            </div>
            <div className="min-w-[200px]">
              <Controller
                name="code"
                control={control}
                render={({ field }) => (
                  <CInput placeholder="Tất cả" label="Mã NVL" {...field} />
                )}
              />
            </div>
            <div className="min-w-[350px]">
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <CInput placeholder="Tất cả" label="Tên NVL" {...field} />
                )}
              />
            </div>
            <div className="min-w-[150px]">
              <Controller
                name="ware_code"
                control={control}
                render={({ field }) => (
                  <CSelect
                    label="Chênh lệch"
                    options={CHECH_LECH_OPTIONS}
                    optionAll
                    placeholder="Tất cả"
                    {...field}
                    onChange={(v) => field.onChange(v.value)}
                  />
                )}
              />
            </div>
          </div>
          <div className="form-group c-input">
            <div>
              <CButton icon={<Magnifying />} onClick={search} className="mr-0">
                Tìm kiếm
              </CButton>
            </div>
          </div>
        </div>
      </CCollapse>
    </>
  );
};
