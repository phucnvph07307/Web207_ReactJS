import api from "./axiosHttp";

const getAll = () => {
  return api.get("/invoice");
};

const get = (id) => {
  return api.get(`/invoice/${id}`);
};

const create = (data) => {
  return api.post("/invoice", data);
};

const update = (id, data) => {
  return api.put(`/invoice/${id}`, data);
};

const remove = (id) => {
  console.log(id);
  return api.delete(`/invoice/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
