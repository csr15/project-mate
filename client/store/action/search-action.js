import axios from "axios";

import Proxy from "../../constants/Proxy";

export const SEARCH = "SEARCH";

export const searchHandler = (searchValue) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${Proxy.proxy}/search/${searchValue}`);

      dispatch({ type: SEARCH, payload: data });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
