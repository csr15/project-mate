import { PUBLISHED } from "../action/publish-action";

const initialState = {
  title: "",
  description: "",
  imageURL: "",
  languages: [],
  previewURL: "",
  developers: [],
  githubURL: "",
  location: "",
  didPublished: false,
};

const publishReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SCREEN1":
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        languages: action.payload.languages,
        imageURL: action.payload.image,
        previewURL: action.payload.previewURL,
        githubURL: action.payload.githubURL,
      };
    case "SCREEN2":
      return {
        ...state,
        developers: action.payload,
      };
    case PUBLISHED:
      return {
        title: "",
        description: "",
        imageURL: "",
        languages: [],
        previewURL: "",
        developers: [],
        githubURL: "",
        location: "",
        didPublished: true,
      };
    default:
      return state;
  }
};

export default publishReducer;
