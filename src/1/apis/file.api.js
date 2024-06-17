import { methods } from "../axios";

export const fileApi = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return await methods.post(`${api}/files/create`, formData);
  },
};
