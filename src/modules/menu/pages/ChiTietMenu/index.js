import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

import { menuApi } from "src/1/apis/menu.api";

import { DetailForm } from "../../components";
import { defaultValues, resolver } from "../../form";

const ChiTietMenu = () => {
  //#region Data
  const params = useParams();

  const { data } = useQuery({
    queryKey: ["chi-tiet-menu", params?.id],
    queryFn: () => menuApi.getById(params?.id),
    enabled: !!params?.id,
    select: (response) => response?.data?.data,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
  });

  const { control, reset } = useForm({
    mode: "all",
    defaultValues: defaultValues,
    resolver: resolver,
  });
  //#endregion

  useEffect(() => {
    if (data) {
      reset({
        ...data,
        stores: data?.stores?.map((e) => ({
          code: e?.store_code,
          name: e?.store_name,
        })),
      });
    }
  }, [data]);

  //#region Render
  return <DetailForm control={control} />;
  //#endregion
};
export default ChiTietMenu;
