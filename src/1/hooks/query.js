import { useQueryClient } from "react-query";

export const useSetQueryData = (queryKey) => {
  const queryClient = useQueryClient();

  const setQueryData = (newData) => {
    queryClient.setQueryData(queryKey, newData);
  };

  return { setQueryData };
};
