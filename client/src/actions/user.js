import * as api from "../api";

export const test = () => async (dispatch) => {
  try {
    await api.test();
  } catch (err) {
    console.log(err);
  }
};
