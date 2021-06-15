import { NOTIFICATION } from "../action/notification-action";

const initialState = {
  notifications: "",
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION:
      return {
        ...state,
        notifications: action.payload,
      };
    case "LOGOUT":
      return {
        notifications: "",
      };
    default:
      return state;
  }
};

export default notificationReducer;
