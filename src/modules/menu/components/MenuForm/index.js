import { Controller } from "react-hook-form";

import { CCard, CCardBody } from "@coreui/react";

import {
  CCheckbox,
  CDate,
  CInput,
  CSelect,
} from "src/common/components/controls";

import { MENU_STATUS_OPTIONS, WEEKDAYS_OPTIONS } from "../../constants";
import { FormToolbar } from "../FormToolbar";

import { StoresTable } from "./StoresTable";

export const MenuForm = ({ onSubmit, control }) => {
  return (
    <>
      <CCard className="toolbar sticky">
        <CCardBody>
          <FormToolbar onSave={onSubmit} />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardBody className="px-0 pt-4">
          <div className="px-4">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <h3 className="text-[#165873] text-3xl font-bold">
                  Thông tin menu
                </h3>
                <div className="grid grid-cols-2 gap-5">
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <CInput
                        label="Tên menu:"
                        placeholder="Nhập tên menu"
                        required
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="status"
                    render={({ field: { onChange, ..._field } }) => (
                      <CSelect
                        label="Trạng thái:"
                        placeholder="Chọn trạng thái"
                        required
                        options={MENU_STATUS_OPTIONS.filter((e, i) => i !== 0)}
                        {..._field}
                        onChange={({ value }) => onChange(value)}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => (
                      <CDate label="Áp dụng từ ngày:" required {...field} />
                    )}
                  />

                  <Controller
                    control={control}
                    name="holiday"
                    render={({ field }) => (
                      <div className="mt-[24px] flex items-center">
                        <CCheckbox label="Áp dụng cho cả ngày lễ" {...field} />
                      </div>
                    )}
                  />

                  <Controller
                    control={control}
                    name="from"
                    render={({ field: { onChange, ..._field } }) => (
                      <CSelect
                        label="Từ:"
                        required
                        options={WEEKDAYS_OPTIONS}
                        {..._field}
                        onChange={({ value }) => onChange(value)}
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="to"
                    render={({ field: { onChange, ..._field } }) => (
                      <CSelect
                        label="Đến:"
                        required
                        options={WEEKDAYS_OPTIONS}
                        {..._field}
                        onChange={({ value }) => onChange(value)}
                      />
                    )}
                  />
                </div>
              </div>
              <div>
                <h3 className="text-[#165873] text-3xl font-bold">
                  Chi nhánh áp dụng
                </h3>

                <div className="max-w-[550px] bg-[#F7F9FB]">
                  <StoresTable control={control} />
                </div>
              </div>
            </div>

            {/* Old UI */}
            {/* <>
              <h3 className="text-[#165873] text-3xl font-bold">
                Thông tin menu
              </h3>
              <div className="grid grid-cols-4 gap-5">
                <div className="grid grid-cols-subgrid gap-5 col-span-2">
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <CInput
                        label="Tên menu:"
                        placeholder="Nhập tên menu"
                        required
                        {...field}
                      />
                    )}
                  />
                </div>

                <div className="grid grid-cols-subgrid gap-5 col-span-2">
                  <Controller
                    control={control}
                    name="status"
                    render={({ field: { onChange, ..._field } }) => (
                      <CSelect
                        label="Trạng thái:"
                        placeholder="Chọn trạng thái"
                        required
                        options={MENU_STATUS_OPTIONS.filter((e, i) => i !== 0)}
                        {..._field}
                        onChange={({ value }) => onChange(value)}
                      />
                    )}
                  />
                </div>

                <Controller
                  control={control}
                  name="date"
                  render={({ field }) => (
                    <CDate label="Áp dụng từ ngày:" required {...field} />
                  )}
                />

                <Controller
                  control={control}
                  name="holiday"
                  render={({ field }) => (
                    <div className="mt-[24px] flex items-center">
                      <CCheckbox label="Áp dụng cho cả ngày lễ" {...field} />
                    </div>
                  )}
                />

                <Controller
                  control={control}
                  name="from"
                  render={({ field: { onChange, ..._field } }) => (
                    <CSelect
                      label="Từ:"
                      required
                      options={WEEKDAYS_OPTIONS}
                      {..._field}
                      onChange={({ value }) => onChange(value)}
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="to"
                  render={({ field: { onChange, ..._field } }) => (
                    <CSelect
                      label="Đến:"
                      required
                      options={WEEKDAYS_OPTIONS}
                      {..._field}
                      onChange={({ value }) => onChange(value)}
                    />
                  )}
                />
              </div>

              <h3 className="text-[#165873] text-3xl font-bold mt-5 mb-3">
                Chi nhánh áp dụng
              </h3>
              <div className="max-w-[450px] bg-[#F7F9FB]">
                <StoresTable control={control} />
              </div>
            </> */}
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};
