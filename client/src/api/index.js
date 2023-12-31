import axios from "axios";

export const baseURL =
  "http://127.0.0.1:5001/water-delivery-13a6c/us-central1/app";

export const validateUserJWTToken = async (token) => {
  try {
    const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
      headers: { Authorization: "Bearer " + token },
    });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//ad new product
export const addNewProduct = async (data) => {
  try {
    const res = await axios.post(`${baseURL}/api/products/create`, { ...data });
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//getAllProducts
export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/all`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//delete a product
export const deleteAproduct = async (productId) => {
  try {
    const res = await axios.delete(
      `${baseURL}/api/products/delete/${productId}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//getAllUsers
export const getAllUsers = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/users/all`);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//add new items to the cart
export const addNewItemToCart = async (user_id, data) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/addToCart/${user_id}`,
      { ...data }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//get all cart items
export const getAllCartItems = async (user_id) => {
  try {
    const res = await axios.get(
      `${baseURL}/api/products/getCartItems/${user_id}`
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

//cart increment
export const increaseQuantity = async (user_id, productId, type) => {
  console.log(user_id, productId, type);
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateCart/${user_id}`,
      null,
      { params: { productId: productId, type: type } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// get all orders
export const getAllOrders = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/orders`);
    console.log(res);
    return res.data.data;
  } catch (error) {
    return null;
  }
};

// update order status
export const updateOrderSts = async (order_id, sts) => {
  try {
    const res = await axios.post(
      `${baseURL}/api/products/updateOrder/${order_id}`,
      null,
      { params: { sts: sts } }
    );
    return res.data.data;
  } catch (error) {
    return null;
  }
};
