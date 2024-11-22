import { methods } from "../axios";

export const comboApi = {
  getAll: async (params) => {
    return await methods.get("/combo", { params });
  },
  getComboById: async (id) => {
    return await methods.get(`/combo/${id}`);
  },
  update: async (id, body) => {
    return await methods.put(`/combo/${id}`, body);
  },
  stop: async (id) => {
    return await methods.put(`/combo/${id}/stop`);
  },
  getAllProposals: async () => {
    return await methods.get(`/combo/proposals`);
  },
  create: async (body) => {
    return await methods.post("/combo/proposals", body);
  },
  getProposalById: async (id) => {
    return await methods.get(`/combo/proposals/${id}`);
  },
  updateProposal: async (id, body) => {
    return await methods.put(`/combo/proposals/${id}`, body);
  },
  removeProposal: async (id) => {
    return await methods.delete(`/combo/proposals/${id}`);
  },
  approveProposal: async (id) => {
    return await methods.put(`/combo/proposals/approval/${id}`);
  },
};
