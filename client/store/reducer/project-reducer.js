import {
  ALL_PROJECTS,
  PROJECTS,
  PROJECT_DETAILS,
} from "../action/project-action";

const initialState = {
  projectsNear: "",
  projectDetails: "",
  allProjects: "",
};

const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROJECTS:
      return {
        ...state,
        projectsNear: [...state.projectsNear, ...action.payload],
      };
    case PROJECT_DETAILS:
      return {
        ...state,
        projectDetails: action.payload,
      };
    case "RESET_PROJECT_DETAILS":
      return {
        ...state,
        projectDetails: "",
      };
    case ALL_PROJECTS:
      return {
        ...state,
        allProjects: [...state.allProjects, ...action.payload],
      };
    case "LOGOUT":
      return {
        projectsNear: "",
        projectDetails: "",
        allProjects: "",
      };
    default:
      return state;
  }
};

export default projectsReducer;
