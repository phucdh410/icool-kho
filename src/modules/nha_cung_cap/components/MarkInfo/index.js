import dayjs from "dayjs";

import { CFileItem } from "src/common/components/others";

export const MarkInfo = ({ watch }) => {
  return (
    <div className="grid grid-cols-4 gap-5">
      <div className="p-6">
        <div className="flex flex-col gap-4">
          <p className="font-medium">
            Ngày đánh giá gần nhất:&nbsp;
            <span className="font-normal">
              {dayjs(watch("ngay-danh-gia-gan-nhat")).format("DD/MM/YYYY")}
            </span>
          </p>
          <p className="font-medium">
            Ngày đánh giá mới nhất:&nbsp;
            <span className="font-normal">
              {dayjs(watch("ngay-danh-gia-moi-nhat")).format("DD/MM/YYYY")}
            </span>
          </p>
          <p className="font-medium">
            Trạng thái:&nbsp;
            <span className="font-normal">{watch("status")}</span>
          </p>
        </div>
      </div>
      <div className="col-span-3 p-6">
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-medium">Danh sách NVL cung cấp:</p>
            <p className="whitespace-pre-wrap">
              {watch("materials")
                ?.map((e) => e?.name)
                ?.join(", ")}
            </p>
          </div>
          <div>
            <p className="font-medium">Danh sách NVL cung cấp:</p>
            {watch("files")?.map((e) => (
              <CFileItem key={e?.id} file={e} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
