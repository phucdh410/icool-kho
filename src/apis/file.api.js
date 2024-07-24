import { global } from "_configs/index";
const { api } = global;

import { FORM_HEADER_FORMDATA, post } from "src/utils/axios";

export const fileApi = {
  upload: async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return await post(`${api}/files/create`, formData, {
      headers: FORM_HEADER_FORMDATA,
    });
  },
};
