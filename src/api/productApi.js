import api from "./axiosHttp";

const getAll = () => {
  return api.get("/product");
};
const getAllProductsClient = () => {
  return api.get("/get_all_products_client");
};

const get = (id) => {
  return api.get(`/product/${id}`);
};

const create = (data) => {
  return api.post("/product", data);
};

const update = (id, data) => {
  return api.put(`/product/${id}`, data);
};

const remove = (id) => {
  console.log(id);
  return api.delete(`/product/${id}`);
};

export default {
  getAll,
  getAllProductsClient,
  get,
  create,
  update,
  remove,
};
