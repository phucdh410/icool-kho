import { CTable } from "src/common/components/others";

export const MenuTable = () => {
  //#region Render
  const fields = [
    {
      key: "index",
      label: "STT",
    },
    {
      key: "name",
      label: "TÊN MENU",
    },
    {
      key: "price",
      label: "GIÁ TRONG MENU",
    },
    {
      key: "from",
      label: "TỪ THỨ",
    },
    {
      key: "to",
      label: "ĐẾN THỨ",
    },
  ];
  return <CTable fields={fields} />;
  //#endregion
};
