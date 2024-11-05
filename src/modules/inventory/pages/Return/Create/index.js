import { useForm } from "react-hook-form";

import { history } from "src/App";
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from "src/configs/constant";

import Form from "../../../components/Form/Return";
import { DEFAULT_VALUES } from "../form";

const InventoryReturnCreate = () => {
  //#region Data
  const { control, handleSubmit, reset } = useForm({
    mode: "all",
    defaultValues: DEFAULT_VALUES,
  });
  //#endregion

  //#region Event
  const onSubmit = () => {
    handleSubmit(async (values) => {
      try {
        console.log("values at line 23 is:", values);
        //note: call create api
        // history.push("/inventory-return/list");
        // reset(DEFAULT_VALUES);
        noti("success", SUCCESS_MESSAGE.INVENTORY_RETURN.CREATE);
      } catch (error) {
        noti("error", ERROR_MESSAGE.INVENTORY_RETURN.CREATE);
      }
    })();
  };
  //#endregion

  //#region Render
  return <Form onSubmit={onSubmit} control={control} />;
  //#endregion
};

export default InventoryReturnCreate;
