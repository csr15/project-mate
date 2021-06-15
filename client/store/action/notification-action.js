import axios from "axios";

export const NOTIFICATION = "NOTIFICATION";

import Proxy from "../../constants/Proxy";

export const fetchNotifications = (uid) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${Proxy.proxy}/notifications/${uid}`);

      dispatch({ type: NOTIFICATION, payload: data });
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    }
  };
};
