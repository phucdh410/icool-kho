import { post } from "src/utils/axios";

const { api } = global;

export const uploadApi = {
  create: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    return post(`${api}/files/create`, formData);
  },
};
