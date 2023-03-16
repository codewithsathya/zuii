import * as api from "../api";
import { authActions } from "../store/auth";

export const googleSignIn = (formData) => async (dispatch) => {
  try {
    const { data } = await api.googleSignIn(formData);
    console.log(data);
  } catch (err) {
    console.log(err);
  }
};
