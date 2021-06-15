import axios from "axios";

import Proxy from "../../constants/Proxy";

export const USER_DETAILS = "USER_DETAILS";
export const COLLABORATED_PROJECTS = "COLLABORATED_PROJECTS";
export const REQUESTED_PROJECTS = "REQUESTED_PROJECTS";

export const fetchUserDetailsHandler = (uid) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${Proxy.proxy}/profile/${uid}`);

      dispatch({
        type: USER_DETAILS,
        payload: {
          userDetails: data.userDetails,
          userProjects: data.userProjects,
        },
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const fetchUserCollaboratedProjectsHandler = (uid) => {
  console.log(uid);
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${Proxy.proxy}/profile/collaborated_projects/${uid}`
      );

      dispatch({
        type: COLLABORATED_PROJECTS,
        payload: data.collaboratedProjects,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
};
