import axios from  "../api/axios"

const API_URL = "/api/products/";

// Get all products
const getAllProducts = () => {
  return axios.get(API_URL);
};

// Get product by id
const getProductById = (id: string) => {
  return axios.get(API_URL + id);
};

// Create new product
const createProduct = (productData: any) => {
  return axios.post(API_URL, productData);
};

// Update product
const updateProduct = (id: string, productData: any) => {
  return axios.put(API_URL + id, productData);
};

// Delete product
const deleteProduct = (id: string) => {
  return axios.delete(API_URL + id);
};

const productService = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default productService;
