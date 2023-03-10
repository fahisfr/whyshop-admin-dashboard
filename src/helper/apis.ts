import axios from "../helper/axios";
export const fetchProductByName = async (productName: string) => {
  const { data } = await axios.get(`/product/${productName}`);

  return data;
};

export const fetchUsers = async () => {
  const { data } = await axios.get("/admin/all-users");
  return data;
};

export const fetchOrders = async () => {
  const { data } = await axios("/order/all-orders");
  return data;
};

export const fetchProducts = async () => {
  const { data } = await axios.get("/product/all-products");
  return data;
};
export const fetchOrderById = async (id: string) => {
  const { data } = await axios(`/order/${id}`);
  return data;
};

export const fetchUserById = async (id: string) => {
  const { data } = await axios.get(`/admin/user/${id}`);
  return data;
};
