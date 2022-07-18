import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3001" });

export const getRepoData = async () => {
  const res = await axios.get("http://localhost:3001/product");
  return res.data;
};

export const createOrder = async (items) => {
  const response = await API.post("/basket", items);
  return response.data;
};

export const getOrders = async () => {
  const response = await API.get("/basket");
  return response.data;
};

// UPDATE PRODUCT İD

export const updateProduct = async (id, data) => {
  const response = await API.put(`/admin/product/${id}`, data);
  return response.data;
};

// DELETE PRODUCT İD

export const deleteProduct = async (id) => {
  const response = await API.delete(`/admin/product/${id}`);
  return response.data;
};

// GET PRODUCT İD

export const getProduct = async (id) => {
  const response = await API.get(`/product/${id}`);
  return response.data;
};

// CREATE PRODUCT

export const createProduct = async (data) => {
  const response = await API.post("/admin/create", data);
  return response.data;
};
