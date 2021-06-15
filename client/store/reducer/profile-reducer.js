import {
  USER_DETAILS,
  COLLABORATED_PROJECTS,
  REQUESTED_PROJECTS,
} from "../action/profile-action";

const initialState = {
  userDetails: "",
  userLocation: "",
  userProjects: [],
  collaboratedProjects: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload.userDetails,
        userProjects: action.payload.userProjects,
      };
    case "USER_LOCATION":
      return {
        ...state,
        userLocation: action.payload,
      };
    case COLLABORATED_PROJECTS:
      return {
        ...state,
        collaboratedProjects: action.payload,
      };
    case "LOGOUT":
      return {
        userLocation: "",
        userProjects: "",
        userDetails: "",
        collaboratedProjects: "",
      };
    default:
      return state;
  }
};

export default profileReducer;
