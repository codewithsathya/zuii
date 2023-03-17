import * as api from "../api";
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
