import api from "./axiosHttp";

const getAll = () => {
  return api.get("/news");
};

const get = (id) => {
  return api.get(`/news/${id}`);
};

const create = (data) => {
  return api.post("/news", data);
};

const update = (id, data) => {
  return api.put(`/news/${id}`, data);
};

const remove = (id) => {
  console.log(id);
  return api.delete(`/news/${id}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
