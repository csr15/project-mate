import { SIGNUP } from "../action/auth-action";

const initialState = {
  signupData: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        signupData: action.payload,
      };
    case "LOGOUT":
      return {
        signupData: "",
      };
    default:
      return state;
  }
};

export default authReducer;
