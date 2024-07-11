export const mapGoodsStatusText = (statusNum) => {
  switch (statusNum) {
    case 2:
      return <span className="font-medium text-[#00B83E]">Đã trong menu</span>;
    case 3:
      return <span className="font-medium text-[#FE0808]">Ngưng</span>;
    default:
      return <span className="font-medium text-[#053C7F]">Mới tạo</span>;
  }
};
