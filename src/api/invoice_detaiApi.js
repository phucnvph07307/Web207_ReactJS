import api from "./axiosHttp";

const getAll = () => {
  return api.get("/invoice_detail");
};

const get = (id) => {
  return api.get(`/invoice_detail/${id}`);
};

const create = (data) => {
  return api.post("/invoice_detail", data);
};

const update = (id, data) => {
  return api.put(`/invoice_detail/${id}`, data);
};

const remove = (id) => {
  console.log(id);
  return api.delete(`/invoice_detail/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
