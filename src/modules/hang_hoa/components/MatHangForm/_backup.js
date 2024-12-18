import { useEffect } from "react";
import {
  Controller,
  useController,
  useFieldArray,
  useWatch,
} from "react-hook-form";

import { CCard, CCardBody } from "@coreui/react";

import {
  CNumber,
  CNumberInput,
  CTextarea,
} from "src/common/components/controls";
import { CTable } from "src/common/components/others";

const calculateFormula = (gia_thuong, gia_le) => {
  const ty_gia = gia_le / gia_thuong;
  return (ty_gia - 1) * 100;
};

export const SuggestTable = ({ control }) => {
  //#region Data
  const { fields: materials } = useFieldArray({
    control,
    name: "materials",
    keyName: "__id",
  });
  const gia_ban_ngay_thuong = useWatch({
    control,
    name: "gia_ban_ngay_thuong",
  });
  const gia_ban_ngay_le = useWatch({
    control,
    name: "gia_ban_ngay_le",
  });

  const {
    field: { onChange: onRateChange },
  } = useController({ control, name: "rate" });

  const fields = [
    {
      key: "code",
      label: "Mã NVL",
      sorter: false,
    },
    {
      key: "name",
      label: "Tên NVL",
      _style: { textAlign: "left" },
      sorter: false,
    },
    {
      key: "group",
      label: "Nhóm NVL",
      sorter: false,
    },
    {
      key: "amount",
      label: "Số lượng",
      sorter: false,
    },
    {
      key: "don_vi_tinh",
      label: "ĐVT lưu kho",
      sorter: false,
    },
  ];

  const render = {
    name: ({ name }) => <td className="text-left">{name}</td>,
  };
  //#endregion

  //#region Event
  //#endregion

  useEffect(() => {
    if (gia_ban_ngay_le) {
      onRateChange(calculateFormula(gia_ban_ngay_thuong, gia_ban_ngay_le));
    }
  }, [gia_ban_ngay_thuong, gia_ban_ngay_le]);

  //#region Render
  return (
    <>
      <div className="flex gap-5">
        <div className="basis-2/3">
          <CCard>
            <CCardBody className="px-0 pt-3">
              <div className="table-responsive">
                <CTable fields={fields} data={materials} render={render} />
              </div>
            </CCardBody>
          </CCard>
        </div>

        <div className="basis-1/3">
          <CCard>
            <CCardBody>
              <div className="flex flex-col gap-2">
                <Controller
                  name="tong_cost"
                  control={control}
                  render={({ field }) => (
                    <CNumberInput
                      label="Tổng cost từ NVL:"
                      required
                      {...field}
                    />
                  )}
                />
                <Controller
                  name="gia_ban_ngay_thuong"
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
                  name="gia_ban_ngay_le"
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

      <div className="flex gap-3 !mt-5 !mb-20">
        <div className="basis-[20%]">
          <CCard>
            <CCardBody>
              <Controller
                name="ghi_chu"
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
                name="ghi_chu"
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
                name="ghi_chu"
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
                name="ghi_chu"
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
                name="ghi_chu"
                control={control}
                render={({ field }) => (
                  <CTextarea label="Ghi chú Ban Giám đốc" {...field} />
                )}
              />
            </CCardBody>
          </CCard>
        </div>
      </div>
    </>
  );

  //#endregion
};
