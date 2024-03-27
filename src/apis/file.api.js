import { post } from "src/utils/axios";

export const fileApi = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return await post("/files/create", formData);
  },
};
