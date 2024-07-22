import { useEffect } from "react";
import {
  Controller,
  useController,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import { PTable } from "src/1/common/components/others";
import { Row } from "./Row";
import { useQuery } from "react-query";
import { nguyenVatLieuApi } from "src/1/apis/nguyen_vat_lieu.api";
import { CCard, CCardBody } from "@coreui/react";
import { CNumberInput, CTextarea } from "src/common/components/controls";

const calculateFormula = (gia_thuong, gia_le) => {
  const ty_gia = gia_le / gia_thuong;
  return ((ty_gia - 1) * 100).toFixed(2).replace(/\.00$/, "");
};

export const PriceTable = ({ control, isPriceEdit }) => {
  //#region Data
  const { fields: materials } = useFieldArray({
    control,
    name: "materials",
    keyName: "__id",
  });
  const price = useWatch({
    control,
    name: "price",
  });
  const holiday_price = useWatch({
    control,
    name: "holiday_price",
  });

  const {
    field: { onChange: onRateChange },
  } = useController({ control, name: "rate" });

  const { data: material_options } = useQuery({
    queryKey: ["materials"],
    queryFn: () => nguyenVatLieuApi.getAll(),
    select: (response) =>
      response?.data?.data?.map((e) => ({ ...e, value: e?.code })),
  });
  //#endregion

  //#region Event
  //#endregion

  useEffect(() => {
    if (holiday_price) {
      onRateChange(calculateFormula(price, holiday_price));
    }
  }, [price, holiday_price]);

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
                  render={({ field }) => (
                    <CNumberInput
                      label="Giá bán ngày thường:"
                      required
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="holiday_price"
                  control={control}
                  render={({ field }) => (
                    <CNumberInput
                      label="Giá bán ngày lễ:"
                      required
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="rate"
                  control={control}
                  render={({ field }) => (
                    <CNumberInput
                      label="Tỷ lệ giá thường/lễ:"
                      currency="%"
                      readOnly
                      required
                      {...field}
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
