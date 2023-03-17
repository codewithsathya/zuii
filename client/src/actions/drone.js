import * as api from "../api";
import { droneActions } from "../store/drone";

export const getFreeDrones = () => async (dispatch) => {
  try {
    const { data } = await api.getFreeDrones();
    // console.log(data);
    dispatch(droneActions.fetchFreeDrones({ data }));
  } catch (err) {
    console.log(err);
  }
};

export const freeTheDrone = (orderId) => async (dispatch) => {
  try {
    const { data } = await api.freeTheDrone(orderId);
    console.log(data);
    dispatch(droneActions.addFree({ data }));
  } catch (err) {
    console.log(err);
  }
};
