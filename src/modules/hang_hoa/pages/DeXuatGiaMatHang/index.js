import { useForm } from "react-hook-form";
import { MatHangForm } from "../../components";

const DeXuatGiaMatHang = () => {
  //#region Data
  const { control } = useForm({
    mode: "all",
    defaultValues: {
      materials: [
        {
          id: "1",
          code: "0001",
          name: "Bò sơ chế",
          group: "Thực phẩm",
          amount: 1,
          don_vi_tinh: "Phần",
        },
        {
          id: "2",
          code: "0002",
          name: "Cà rốt",
          group: "Rau củ",
          amount: 100,
          don_vi_tinh: "Gram",
        },
        {
          id: "3",
          code: "0003",
          name: "Rau cải",
          group: "Rau củ",
          amount: 100,
          don_vi_tinh: "Gram",
        },
        {
          id: "4",
          code: "0004",
          name: "Nước mắm",
          group: "Gia vị",
          amount: 100,
          don_vi_tinh: "Ml",
        },
      ],
    },
  });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return <MatHangForm control={control} isSuggest />;
  //#endregion
};

export default DeXuatGiaMatHang;
