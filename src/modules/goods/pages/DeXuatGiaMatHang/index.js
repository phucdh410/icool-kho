import { useForm } from "react-hook-form";
import { MatHangForm } from "../../components";

const DeXuatGiaMatHang = () => {
  //#region Data
  const { control } = useForm({ mode: "all" });
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return <MatHangForm control={control} isSuggest />;
  //#endregion
};

export default DeXuatGiaMatHang;
