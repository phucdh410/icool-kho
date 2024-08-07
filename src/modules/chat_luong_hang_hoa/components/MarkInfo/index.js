import dayjs from "dayjs";

import { CCard, CCardBody } from "@coreui/react";

import { CFileItem } from "src/common/components/others";

export const MarkInfo = ({ watch }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-1">
        <CCard>
          <CCardBody>
            <div className="flex flex-col gap-3">
              <p className="font-medium mb-0">
                Ngày đánh giá gần nhất:&nbsp;
                <span className="font-normal">
                  {dayjs(watch("modified_date")).format("DD/MM/YYYY")}
                </span>
              </p>
              <p className="font-medium mb-0">
                Ngày đánh giá mới nhất:&nbsp;
                <span className="font-normal">
                  {dayjs(watch("modified_date")).format("DD/MM/YYYY")}
                </span>
              </p>
              <p className="font-medium mb-0">
                Trạng thái:&nbsp;
                <span className="font-normal">{watch("status")}</span>
              </p>
            </div>
          </CCardBody>
        </CCard>
      </div>

      <div className="col-span-3">
        <CCard>
          <CCardBody>
            <div className="flex flex-col gap-3">
              <div>
                <p className="font-medium mb-0">Danh sách NVL cung cấp:</p>
                <p className="whitespace-pre-wrap mb-0">
                  {watch("materials")
                    ?.map((e) => e?.name)
                    ?.join(", ")}
                </p>
              </div>
              <div>
                <p className="font-medium mb-0">Tài liệu minh chứng:</p>
                {watch("files")?.map((e) => (
                  <CFileItem key={e?.id} file={e} />
                ))}
              </div>
            </div>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
};
