import * as api from "../api";
import { authActions } from "../store/auth";

export const googleSignIn = (formData) => async (dispatch) => {
  try {
    const { data } = await api.googleSignIn(formData);
    // console.log(data);
    dispatch(
      authActions.authenticate({ data: data.result, token: data.token })
    );
  } catch (err) {
    console.log(err);
  }
};
