import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import {
  getProductFailure,
  getProductStart,
  getProductSuccess,
  deleteProductFailure,
  deleteProductStart,
  deleteProductSuccess,
  updateProductFailure,
  updateProductStart,
  updateProductSuccess,
  addProductFailure,
  addProductStart,
  addProductSuccess,
} from "./productRedux";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  addOrderFailure,
  addOrderStart,
  addOrderSuccess,
  deleteOrderFailure,
  deleteOrderStart,
  deleteOrderSuccess,
  getOrderFailure,
  getOrderStart,
  getOrderSuccess,
  updateOrderFailure,
  updateOrderStart,
  updateOrderSuccess,
} from "./OrderRedux";

export const Signup = async (dispatch, user) => {
  try {
    await axios.post(`/api/auth/registeradmin`, user);
    toast.success("Successfully Signed Up.Please Verify your Email");
  } catch (error) {
    toast.error(`${error.message}`);
  }
};

export const Login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(`/api/auth/loginadmin`, user);
    localStorage.setItem("userInfo", JSON.stringify(res.data));
    dispatch(loginSuccess(res.data));
    toast.success("Successfully Logged In");
  } catch (error) {
    toast.error(error.message);
    dispatch(loginFailure());
  }
};

export const GetProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await axios.get("/api/products");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const DeleteProduct = async (id, dispatch) => {
  const user = useSelector((state) => state.user.currentUser);

  dispatch(deleteProductStart());
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const UpdateProduct = async (productId, updatedProduct, dispatch) => {
  const user = useSelector((state) => state.user.currentUser);

  dispatch(updateProductStart());
  if (!updatedProduct) {
    alert("Please Fill in Field to Update!");
    return;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.put(`/api/products/${productId}`, updatedProduct, config);
    dispatch(updateProductSuccess({ productId, updatedProduct }));
    alert("Product Added Successfully");
  } catch (error) {
    dispatch(updateProductFailure());
  }
};

export const AddProduct = async (product, dispatch) => {
  const user = useSelector((state) => state.user.currentUser);

  dispatch(addProductStart());
  if (
    !product.title ||
    !product.desc ||
    !product.size ||
    !product.price ||
    !product.inStock ||
    !product.image ||
    !product.cat
  ) {
    alert("Please Fill All the Fields!");
    return;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.post(
      `/api/products/newproduct`,
      product,
      config
    );
    dispatch(addProductSuccess(data));
  } catch (error) {
    dispatch(addProductFailure());
  }
};

export const AddOrder = async (order, dispatch) => {
  const user = useSelector((state) => state.user.currentUser);

  dispatch(addOrderStart());
  if (!order.userId || !order.products || !order.amount || !order.address) {
    alert("Please Fill All the Fields!");
    return;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.post(`/api/orders/newproduct`, order, config).then((res) => {
      dispatch(addOrderSuccess(res.data));
      alert("Product Added Successfully");
    });
  } catch (error) {
    dispatch(addOrderFailure());
    alert("error occured" + error);
  }
};

export const GetOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    await axios.get("/api/orders").then((res) => {
      dispatch(getOrderSuccess(res.data));
    });
  } catch (err) {
    dispatch(getOrderFailure());
  }
};
export const UpdateOrder = async (orderId, updatedOrder, dispatch) => {
  const user = useSelector((state) => state.user.currentUser);

  dispatch(updateOrderStart());
  if (!updatedOrder) {
    alert("Please Fill in Field to Update!");
    return;
  }
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios
      .put(`/api/orders/${orderId}`, updatedOrder, config)
      .then((res) => {
        const response = res.data;
        dispatch(updateOrderSuccess({ orderId, response }));
      });
  } catch (error) {
    dispatch(updateOrderFailure());
    alert("error occured" + error);
  }
};
export const DeleteOrder = async (id, dispatch) => {
  const user = useSelector((state) => state.user.currentUser);

  dispatch(deleteOrderStart());
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    await axios.delete(`/api/orders/${id}`, config).then(() => {
      dispatch(deleteOrderSuccess(id));
    });
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};
