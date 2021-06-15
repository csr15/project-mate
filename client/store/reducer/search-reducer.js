import { SEARCH } from "../action/search-action";

const initialState = {
  searchResults: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        searchResults: action.payload,
      };
    case "RESET_SEARCH":
      return {
        searchResults: "",
      };
    default:
      return state;
  }
};

export default searchReducer;
