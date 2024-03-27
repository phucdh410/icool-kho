import { Controller, useForm } from "react-hook-form";
import {
  CButton,
  CFile,
  CInput,
  CNumber,
  CSelect,
} from "src/common/components/controls";
import { getAll as getAllSupplier } from "src/common/queries-fn/supplier.query";

const NCC_CODES = [
  { value: "KTT", label: "KTT" },
  { value: "TH", label: "TH" },
  { value: "NTC", label: "NTC" },
  { value: "MT", label: "MT" },
  { value: "HQS", label: "HQS" },
  { value: "TTRX", label: "TTRX" },
  { value: "RACK", label: "RACK" },
];

const NCC_NAMES = [
  { value: "KTT", label: "Kho Trung Tâm" },
  { value: "TH", label: "Thuận Hương" },
  { value: "NTC", label: "Nghĩa Trái Cây" },
  { value: "MT", label: "Minh Tâm" },
  { value: "HQS", label: "Hoa Quả Sơn" },
  { value: "TTRX", label: "Trên Trời Rơi Xuống" },
  { value: "RACK", label: "Jack J-97" },
];

export const MForm = ({ code }) => {
  //#region Data
  const { control, handleSubmit, reset } = useForm({ mode: "all" });

  const { data } = getAllSupplier();
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      console.log(values);
    })();
  };
  //#endregion

  //#region Render
  return (
    <div
      style={{
        border: "1px solid #cfcfcf",
        borderRadius: "8px",
        padding: "24px",
      }}
    >
      <div className="row">
        <div className="col-3">
          <Controller
            control={control}
            name="vendorId"
            rules={{ required: true }}
            render={({ field }) => (
              <CSelect {...field} label="Mã NCC" options={NCC_CODES} required />
            )}
          />
        </div>
        <div className="col-5">
          <Controller
            control={control}
            name="vendorId"
            rules={{ required: true }}
            render={({ field }) => (
              <CSelect
                {...field}
                label="Tên NCC"
                options={NCC_NAMES}
                required
              />
            )}
          />
        </div>
        <div className="col-4">
          <div className="row">
            <div className="col-6">
              <Controller
                control={control}
                name="price"
                rules={{ required: true }}
                render={({ field }) => (
                  <CNumber {...field} label="Đơn giá" required />
                )}
              />
            </div>
            <div className="col-6">
              <Controller
                control={control}
                name="unit"
                rules={{ required: true }}
                render={({ field }) => (
                  <CInput {...field} label="Đơn vị báo giá" required />
                )}
              />
            </div>
          </div>
        </div>
        <div className="col-3">
          <Controller
            control={control}
            name="file"
            rules={{ required: true }}
            render={({ field }) => (
              <CFile label="Chứng từ đính kèm" {...field} required />
            )}
          />
        </div>
        <div className="col-5">
          <Controller
            control={control}
            name="note"
            render={({ field }) => <CInput {...field} label="Ghi chú" />}
          />
        </div>
        <div className="col-4">
          <div
            style={{
              display: "flex",
              alignItems: "end",
              justifyContent: "end",
              height: "100%",
            }}
          >
            <CButton className="btn-primary" onClick={onSubmit}>
              Thêm
            </CButton>
          </div>
        </div>
      </div>
    </div>
  );
  //#endregion
};
