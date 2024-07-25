import { useEffect, useState } from "react";
import {
  Controller,
  useController,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { useQuery } from "react-query";

import { CCard, CCardBody } from "@coreui/react";

import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";
import { PTable } from "src/1/common/components/others";
import { CNumberInput, CTextarea } from "src/common/components/controls";

import { Row } from "./Row";

const calculateHolidayPrice = (gia_thuong, ty_gia) => {
  const holiday_price = (ty_gia / 100) * gia_thuong + gia_thuong;
  return holiday_price.toFixed(2).replace(/\.00$/, "");
};
const calculateRate = (gia_thuong, gia_le) => {
  const ty_gia = ((gia_le - gia_thuong) / gia_thuong) * 100;
  return ty_gia.toFixed(2).replace(/\.00$/, "");
};

export const PriceTable = ({ control, isPriceEdit }) => {
  //#region Data
  const { fields: materials } = useFieldArray({
    control,
    name: "materials",
    keyName: "__id",
  });
  const normal_price = useWatch({
    control,
    name: "price",
  });
  const holiday_price = useWatch({
    control,
    name: "holiday_price",
  });
  const rate = useWatch({
    control,
    name: "rate",
  });

  const [changeWhat, setChangeWhat] = useState("holiday_price"); // "price" | "holiday_price" | "rate"

  const {
    field: { onChange: onRateChange },
  } = useController({ control, name: "rate" });
  const {
    field: { onChange: onHolidayPriceChange },
  } = useController({ control, name: "holiday_price" });

  const { data: material_options } = useQuery({
    queryKey: ["materials"],
    queryFn: () => nguyenVatLieuApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, value: e?.code })),
  });
  //#endregion

  //#region Event
  const handleChangeNormalPrice = (changeCb) => (newValue) => {
    setChangeWhat("price");
    changeCb(newValue);
  };
  const handleChangeHolidayPrice = (changeCb) => (newValue) => {
    setChangeWhat("holiday_price");
    changeCb(newValue);
  };
  const handleChangeRate = (changeCb) => (newValue) => {
    setChangeWhat("rate");
    changeCb(newValue);
  };
  //#endregion

  useEffect(() => {
    if (changeWhat === "price" || changeWhat === "holiday_price") {
      // Change price or holiday_price -> update rate
      const tmpRate = calculateRate(normal_price, holiday_price);

      if (tmpRate !== "NaN" && rate !== tmpRate) onRateChange(tmpRate);
    } else {
      // Change rate -> update holiday_price
      const tmpHolidayPrice = calculateHolidayPrice(normal_price, rate);

      if (tmpHolidayPrice !== "NaN" && holiday_price !== tmpHolidayPrice) {
        onHolidayPriceChange(tmpHolidayPrice);
      }
    }
  }, [normal_price, holiday_price, rate, changeWhat]);

  //#region Render
  return (
    <>
      <div className="flex gap-5">
        <div className="basis-3/4 overflow-hidden">
          <CCard>
            <CCardBody className="px-0 pt-3">
              <PTable>
                <thead>
                  <tr>
                    <th style={{ minWidth: "200px" }}>Mã NVL</th>
                    <th align="left" style={{ minWidth: "250px" }}>
                      Tên NVL
                    </th>
                    <th style={{ minWidth: "200px" }}>Nhóm NVL</th>
                    <th style={{ minWidth: "100px" }}>Số Lượng</th>
                    <th style={{ minWidth: "180px" }}>Giá</th>
                    <th style={{ minWidth: "140px" }}>ĐVT Lưu Kho</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((material, index) => (
                    <Row
                      key={material.__id}
                      material_options={material_options}
                      control={control}
                      index={index}
                    />
                  ))}
                </tbody>
              </PTable>
            </CCardBody>
          </CCard>
        </div>

        <div className="basis-1/4 shrink-0">
          <CCard>
            <CCardBody>
              <div className="flex flex-col gap-2">
                <Controller
                  control={control}
                  name="cost"
                  render={({ field: { value } }) => (
                    <CNumberInput
                      label="Tổng cost từ NVL:"
                      required
                      disabled
                      value={value}
                    />
                  )}
                />
                <Controller
                  name="price"
                  control={control}
                  render={({ field: { onChange, ..._field } }) => (
                    <CNumberInput
                      label="Giá bán ngày thường:"
                      required
                      onChange={handleChangeNormalPrice(onChange)}
                      {..._field}
                    />
                  )}
                />
                <Controller
                  name="holiday_price"
                  control={control}
                  render={({ field: { onChange, ..._field } }) => (
                    <CNumberInput
                      label="Giá bán ngày lễ:"
                      required
                      onChange={handleChangeHolidayPrice(onChange)}
                      {..._field}
                    />
                  )}
                />
                <Controller
                  name="rate"
                  control={control}
                  render={({ field: { onChange, ..._field } }) => (
                    <CNumberInput
                      label="Tỷ lệ giá thường/lễ:"
                      currency="%"
                      onChange={handleChangeRate(onChange)}
                      required
                      {..._field}
                    />
                  )}
                />
                <Controller
                  name="vat"
                  control={control}
                  render={({ field }) => (
                    <CNumberInput
                      label="Phần trăm xuất VAT:"
                      currency="%"
                      required
                      {...field}
                    />
                  )}
                />
              </div>
            </CCardBody>
          </CCard>
        </div>
      </div>

      {!isPriceEdit && (
        <div className="flex gap-3 !mt-5 !mb-20">
          <div className="basis-[20%]">
            <CCard>
              <CCardBody>
                <Controller
                  name="proposer_note"
                  control={control}
                  render={({ field }) => (
                    <CTextarea label="Ghi chú người đề xuất giá" {...field} />
                  )}
                />
              </CCardBody>
            </CCard>
          </div>
          <div className="basis-[20%]">
            <CCard>
              <CCardBody>
                <Controller
                  name="ware_note"
                  control={control}
                  render={({ field }) => (
                    <CTextarea label="Ghi chú TBP KTT" {...field} />
                  )}
                />
              </CCardBody>
            </CCard>
          </div>
          <div className="basis-[20%]">
            <CCard>
              <CCardBody>
                <Controller
                  name="accountant_note"
                  control={control}
                  render={({ field }) => (
                    <CTextarea label="Ghi chú kế toán" {...field} />
                  )}
                />
              </CCardBody>
            </CCard>
          </div>
          <div className="basis-[20%]">
            <CCard>
              <CCardBody>
                <Controller
                  name="ic_note"
                  control={control}
                  render={({ field }) => (
                    <CTextarea label="Ghi chú Kiểm soát nội bộ" {...field} />
                  )}
                />
              </CCardBody>
            </CCard>
          </div>
          <div className="basis-[20%]">
            <CCard>
              <CCardBody>
                <Controller
                  name="operator_note"
                  control={control}
                  render={({ field }) => (
                    <CTextarea label="Ghi chú Ban Giám đốc" {...field} />
                  )}
                />
              </CCardBody>
            </CCard>
          </div>
        </div>
      )}
    </>
  );

  //#endregion
};
