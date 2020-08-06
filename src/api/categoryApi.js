import api from "./axiosHttp";

const getAll = () => {
  return api.get("/category");
};

const get = (id) => {
  return api.get(`/category/${id}`);
};

const create = (data) => {
  return api.post("/category", data);
};

const update = (id, data) => {
  return api.put(`/category/${id}`, data);
};

const remove = (id) => {
  console.log(id);
  return api.delete(`/category/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
