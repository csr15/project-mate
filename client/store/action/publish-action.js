import axios from "axios";

import Proxy from "../../constants/Proxy";

export const PUBLISHED = "PUBLISHED";

export const publishProjectHandler = (projectDetails) => {
  return async (dispatch) => {
    try {
      const {
        data,
      } = await axios.post(`${Proxy.proxy}/publish/${projectDetails.uid}`, {
        data: projectDetails,
      });

      dispatch({ type: PUBLISHED });
    } catch (error) {
      throw Error(error.message);
    }
  };
};
