import { methods } from "../axios";

export const comboApi = {
  getAll: async (params) => {
    return await methods.get("/combos", { params });
  },
  getAllProposals: async () => {
    return await methods.get(`/combo/proposals`);
  },
  create: async (body) => {
    return await methods.post("/combo/proposals", body);
  },
  getProposalById: async () => {
    return await methods.get(`/combo/propasals/${id}`);
  },
  updateProposal: async (id, body) => {
    return await methods.post(`/combo/proposals/${id}`, body);
  },
  removeProposal: async (id) => {
    return await methods.delete(`/combo/propasals/${id}`);
  },
};
