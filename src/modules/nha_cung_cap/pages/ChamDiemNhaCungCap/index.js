import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { nhaCungCapApi } from "src/1/apis/nha_cung_cap.api";

const ChamDiemNhaCungCap = () => {
  //#region Data
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["chi-tiet-diem-ncc", params?.supplierId],
    queryFn: () => nhaCungCapApi.getDetailSupplier(params?.supplierId),
    enabled: !!params?.supplierId,
    select: (response) => response?.data?.data,
  });
  console.log(data);
  //#endregion

  //#region Event
  //#endregion

  //#region Render
  return <div>AS</div>;
  //#endregion
};
export default ChamDiemNhaCungCap;
