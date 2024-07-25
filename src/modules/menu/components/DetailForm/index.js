import { Controller } from "react-hook-form";

import { CCard, CCardBody } from "@coreui/react";

import { CCheckbox, CInput, CSelect } from "src/common/components/controls";

import { MENU_STATUS_OPTIONS, WEEKDAYS_OPTIONS } from "../../constants";

import { GoodsTable } from "./GoodsTable";
import { StoresTable } from "./StoresTable";

export const DetailForm = ({ control }) => {
  return (
    <>
      <CCard>
        <CCardBody className="px-0 pt-4">
          <div className="px-4">
            <h3 className="text-[#165873] text-3xl font-bold">
              Thông tin menu
            </h3>
            <div className="grid grid-cols-4 gap-4">
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <CInput
                    label="Tên menu:"
                    placeholder="Nhập tên menu"
                    required
                    readOnly
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <CSelect
                    label="Trạng thái:"
                    placeholder="Chọn trạng thái"
                    required
                    readOnly
                    options={MENU_STATUS_OPTIONS.filter((e, i) => i !== 0)}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="from"
                render={({ field }) => (
                  <CSelect
                    label="Từ:"
                    required
                    readOnly
                    options={WEEKDAYS_OPTIONS}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="to"
                render={({ field }) => (
                  <CSelect
                    label="Đến:"
                    required
                    readOnly
                    options={WEEKDAYS_OPTIONS}
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="date"
                render={({ field }) => (
                  <CInput
                    label="Áp dụng từ ngày:"
                    required
                    readOnly
                    {...field}
                  />
                )}
              />
              <Controller
                control={control}
                name="holiday"
                render={({ field }) => (
                  <div className="mt-[24px] flex items-center">
                    <CCheckbox
                      label="Áp dụng cho cả ngày lễ"
                      readOnly
                      disabled
                      {...field}
                    />
                  </div>
                )}
              />
              <div className="col-start-1 col-span-2 mt-3">
                <h3 className="text-[#165873] text-3xl font-bold">
                  Chi nhánh áp dụng
                </h3>
                <StoresTable control={control} />
              </div>
              <div className="col-span-2 mt-3">
                <GoodsTable control={control} />
              </div>
            </div>
          </div>
        </CCardBody>
      </CCard>
    </>
  );
};
