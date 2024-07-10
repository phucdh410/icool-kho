import { WEEKDAYS } from "./constants";

export const mapWeekday = (dayNumber = 2) => {
  return WEEKDAYS[dayNumber];
};

export const mapStatusText = (statusNum = 1) => {
  switch (statusNum) {
    case 2:
      return <span className="font-medium text-[#00B83E]">Áp dụng</span>;
    case 3:
      return <span className="font-medium text-[#FE0808]">Ngưng</span>;
    default:
      return <span className="font-medium text-[#053C7F]">Mới tạo</span>;
  }
};
