import api from "./axiosHttp";

const getAll = () => {
  return api.get("/contact");
};

const get = (id) => {
  return api.get(`/contact/${id}`);
};

const create = (data) => {
  return api.post("/contact", data);
};

const update = (id, data) => {
  return api.put(`/contact/${id}`, data);
};

const remove = (id) => {
  console.log(id);
  return api.delete(`/contact/${id}`);
};

const getAllAdmin = () => {
  return api.get("/get_all_categories");
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
