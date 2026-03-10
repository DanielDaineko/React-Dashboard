import axios from "axios";

const BASE_URL = "https://dummyjson.com";

export async function getProducts() {
  const response = await axios.get(`${BASE_URL}/products?limit=12`);
  return response.data;
}

export async function getUsers() {
  const response = await axios.get(`${BASE_URL}/users?limit=8`);
  return response.data;
}

export async function getCarts() {
  const response = await axios.get(`${BASE_URL}/carts?limit=10`);
  return response.data;
}
