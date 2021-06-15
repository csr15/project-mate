import axios from "axios";

export const PROJECTS = "PROJECTS";
export const PROJECT_DETAILS = "PROJECT_DETAILS";
export const ALL_PROJECTS = "ALL_PROJECTS";

import Proxy from "../../constants/Proxy";

export const fetchProjectsNearHandler = (location, distance, limit) => {
  return async (dispatch, getState) => {
    const currentUID = getState().profile.userDetails._id;
    try {
      const { data } = await axios.post(
        `${Proxy.proxy}/projects/fetch_projects_near/${limit}`,
        {
          location: location,
          distance: distance,
        }
      );

      const filteredData = [
        ...data.projects.filter((el) => el.uid !== currentUID),
      ];

      dispatch({ type: PROJECTS, payload: filteredData });
    } catch (error) {
      throw Error(error.message);
    }
  };
};

export const fetchProjectDetailsHandler = (projectId) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${Proxy.proxy}/projects/project_details/${projectId}`
      );

      dispatch({ type: PROJECT_DETAILS, payload: data.details });
    } catch (error) {
      console.log(error);
      throw Error(error.message);
    }
  };
};

export const fetchAllProjectsHandler = (limit) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${Proxy.proxy}/projects/all_projects/${limit}`
      );

      dispatch({ type: ALL_PROJECTS, payload: data.projects });
    } catch (error) {
      throw new Error(error.message);
    }
  };
};
