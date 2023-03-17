import * as api from "../api";
import { droneActions } from "../store/drone";
import { orderActions } from "../store/orders";

export const getOrderList = () => async (dispatch) => {
  try {
    dispatch(orderActions.startLoading());
    const { data } = await api.getOrderList();
    // console.log(data);
    dispatch(orderActions.fetchOrdersList({ data: data.orders }));
    dispatch(orderActions.endLoading());
  } catch (err) {
    console.log(err);
  }
};

export const getRequests = () => async (dispatch) => {
  try {
    dispatch(orderActions.startLoading());
    const { data } = await api.getRequests();
    console.log("bc ", data);
    dispatch(orderActions.fetchOrdersList({ data }));
    dispatch(orderActions.endLoading());
  } catch (err) {
    console.log(err);
  }
};

export const bookOrder = (orderCords, navigate) => async (dispatch) => {
  console.log(orderCords);
  try {
    const { data } = await api.bookOrder(orderCords);
    console.log(data);
    navigate("/");
    // dispatch
  } catch (err) {
    console.log(err);
  }
};

export const acceptOrder = (orderId) => async (dispatch) => {
  console.log(orderId);
  try {
    const { data } = await api.acceptOrder(orderId);
    console.log(data);
    dispatch(orderActions.accept({ data: data.updatedOrder }));
    dispatch(
      droneActions.removeFromFree({ data: data.updatedOrder.assignedDrone._id })
    );

    return data.timeToFree;
  } catch (err) {
    console.log(err);
  }
};

export const rejectOrder = (orderId) => async (dispatch) => {
  try {
    await api.rejectOrder(orderId);
    dispatch(orderActions.reject({ data: orderId }));
  } catch (err) {
    console.log(err);
  }
};
