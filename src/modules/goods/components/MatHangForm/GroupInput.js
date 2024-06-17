import { Controller } from "react-hook-form";
import {
  C1Upload,
  CInput,
  CSelect,
  CTextarea,
} from "src/common/components/controls";

export const GroupInput = ({ control }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-end gap-5">
        <div className="basis-[20%]">
          <Controller
            name="nganh_hang_hoa"
            control={control}
            render={({ field }) => (
              <CSelect
                options={[]}
                label="Ngành hàng hóa:"
                required
                {...field}
              />
            )}
          />
        </div>

        <div className="basis-[20%]">
          <Controller
            name="nhom_hang_hoa"
            control={control}
            render={({ field }) => (
              <CSelect
                options={[]}
                label="Nhóm hàng hóa:"
                required
                {...field}
              />
            )}
          />
        </div>

        <div className="basis-[20%]">
          <Controller
            name="chu_ngu"
            control={control}
            render={({ field }) => (
              <CInput label="Tên hàng hóa" placeholder="Chủ ngữ" {...field} />
            )}
          />
        </div>
        <div className="basis-[20%]">
          <Controller
            name="vi_ngu"
            control={control}
            render={({ field }) => (
              <CInput label="" placeholder="Vị ngữ" {...field} />
            )}
          />
        </div>
        <div className="basis-[20%]">
          <Controller
            name="bo_sung"
            control={control}
            render={({ field }) => (
              <CInput label="" placeholder="Bổ sung" {...field} />
            )}
          />
        </div>
      </div>

      <div className="flex items-start gap-5">
        <div className="basis-[20%]">
          <Controller
            name="ma_hang_hoa"
            control={control}
            render={({ field }) => (
              <CInput label="Mã hàng hóa" readOnly {...field} />
            )}
          />
        </div>
        <div className="basis-[20%]">
          <Controller
            name="don_vi_tinh"
            control={control}
            render={({ field }) => <CInput label="Đơn Vị Tính" {...field} />}
          />
        </div>
        <div className="basis-[20%]">
          <Controller
            name="dinh_muc_mon_cho"
            control={control}
            render={({ field }) => (
              <CInput label="Định mức món cho" {...field} />
            )}
          />
        </div>
        <div className="basis-[20%]">
          <Controller
            name="ghi_chu"
            control={control}
            render={({ field }) => <CTextarea label="Ghi chú" {...field} />}
          />
        </div>
        <div className="basis-[20%]">
          <C1Upload label="Hình ảnh hàng hóa" required />
          {/* <Controller
            name="ghi_chu"
            control={control}
            render={({ field }) => <CTextarea label="Ghi chú" {...field} />}
          /> */}
        </div>
      </div>
    </div>
  );
};
