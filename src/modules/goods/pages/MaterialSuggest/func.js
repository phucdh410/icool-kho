export const removeLastDot = (inputString) => {
  // Kiểm tra xem chuỗi có kết thúc bằng dấu chấm không
  if (inputString.endsWith(".")) {
    // Xóa dấu chấm cuối cùng nếu có
    return inputString.slice(0, -1);
  }
  // Trả về chuỗi không thay đổi nếu không có dấu chấm cuối cùng
  return inputString;
};

export const formatPayload = (payload) => {
  return {
    name: payload?.name,
    materialTypeCode: payload?.materialTypeCode?.value,
    formulaUnit: payload?.formulaUnit,
    wareUnit: payload?.wareUnit,
    boughtUnit: payload?.boughtUnit,
    providerUnit: payload?.providerUnit,
    expired: Number(payload?.expired?.value),
    wareEx: Number(payload?.wareEx),
    boughtEx: Number(payload?.boughtEx),
    providerEx: Number(payload?.providerEx),
    code: removeLastDot(payload?.code),
    subject: payload?.subject,
    predicate: payload?.predicate,
    complement: payload?.complement,
    time: Number(payload?.time),
    note: payload?.note,
    accountantNote: payload?.accountantNote,
    allow: Number(payload?.allow),
    allow_central: Number(payload?.allow_central),
    materialLocation: payload?.materialLocation?.value,
    listStores: payload?.listStores?.map((e) => e.code),
  };
};
