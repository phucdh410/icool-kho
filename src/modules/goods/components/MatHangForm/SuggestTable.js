import { CCard, CCardBody } from "@coreui/react";
import { useEffect } from "react";
import {
  Controller,
  useController,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import {
  CInput,
  CNumber,
  CNumberInput,
  CTextarea,
} from "src/common/components/controls";
import { CTable } from "src/common/components/others";

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
    },
    {
      key: "name",
      label: "Tên NVL",
      _style: { textAlign: "left" },
    },
    {
      key: "group",
      label: "Nhóm NVL",
    },
    {
      key: "amount",
      label: "Số lượng",
    },
    {
      key: "don_vi_tinh",
      label: "ĐVT lưu kho",
    },
  ];

  const render = {
    code: () => (
      <td>
        <CSelect options={[]} />
      </td>
    ),
    name: () => (
      <td>
        <CSelect options={[]} />
      </td>
    ),
    group: ({ group }) => <td>{group}</td>,
    amount: ({ amount }) => (
      <td>
        <CNumber />
      </td>
    ),
    don_vi_tinh: ({ don_vi_tinh }) => <td>{don_vi_tinh}</td>,
  };
  //#endregion

  //#region Event
  //#endregion

  useEffect(() => {
    if (gia_ban_ngay_le) {
      onRateChange(((gia_ban_ngay_thuong || 0) / gia_ban_ngay_le) * 100);
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
