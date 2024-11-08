import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { phieuTraHangApi } from "src/1/apis/phieu_tra_hang.api";
import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import Form from "../../../components/Form/Return";
import { DEFAULT_VALUES } from "../form";

const InventoryReturnUpdate = () => {
  //#region Data
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["chi-tiet-phieu-tra-hang", params?.id],
    queryFn: () => phieuTraHangApi.getById(params.id),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
  });

  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues: DEFAULT_VALUES,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        const { id, ...payload } = values;
        await phieuTraHangApi.update(id, payload);
        history.push("/inventory-return/list");
        noti("success", SUCCESS_MESSAGE.INVENTORY_RETURN.UPDATE);
        reset(DEFAULT_VALUES);
      } catch (error) {
        noti("error", ERROR_MESSAGE.INVENTORY_RETURN.UPDATE);
      }
    })();
  };
  //#endregion

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data]);

  //#region Render
  return <Form onSubmit={onSubmit} control={control} isEdit />;
  //#endregion
};

export default InventoryReturnUpdate;
