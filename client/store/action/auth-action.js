import axios from "axios";
import { AsyncStorage } from "react-native";
import Proxy from "../../constants/Proxy";

export const SIGNUP = "SIGUP";

export const signupHandler = (signupData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${Proxy.proxy}/auth/signup`, {
        data: {
          ...signupData,
        },
      });

      dispatch({ type: SIGNUP, payload: data });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

export const signinHandler = (singinData) => {
  return async () => {
    try {
      const { data } = await axios.post(`${Proxy.proxy}/auth/signin`, {
        data: {
          ...singinData,
        },
      });

      saveData(data.uid);
    } catch (error) {
      console.log(error);
      throw new Error("Mail ID or password is wrong");
    }
  };
};

export const googleAuthHandler = (authData) => {
  return async () => {
    try {
      const { data } = await axios.post(`${Proxy.proxy}/auth/google_oauth`, {
        data: {
          ...authData,
        },
      });

      saveData(data.uid);
    } catch (error) {
      throw new Error(error.message);
    }
  };
};

const saveData = async (uid) => {
  try {
    await AsyncStorage.setItem("userDetails", JSON.stringify({ uid: uid }));
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};
