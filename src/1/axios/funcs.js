import dayjs from "dayjs";

export function formatRequestData(data) {
  if (Array.isArray(data)) {
    return data.map((item) => formatRequestData(item));
  } else if (typeof data === "object" && data !== null) {
    const formattedData = {};

    for (const [key, value] of Object.entries(data)) {
      if (key.includes("date")) {
        formattedData[key] = dayjs(value).format("YYYY-MM-DD");
      } else if (key.includes("file")) {
        if (Array.isArray(value)) {
          //note: Nếu là mảng object, lấy mảng id của từng object
          formattedData[key] = value.map((file) => file.id);
        } else if (typeof value === "object" && value !== null) {
          //note: Nếu là object, lấy ra id của object đó
          formattedData[key] = value.id;
        } else {
          formattedData[key] = value;
        }
      } else {
        formattedData[key] = formatRequestData(value);
      }
    }

    return formattedData;
  }

  return data;
}
