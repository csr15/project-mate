import React from "react";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import AppLoading from "expo-app-loading";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import Navigator from "./Navigation/Navigation";
import authReducer from "./store/reducer/auth-reducer";
import publishReducer from "./store/reducer/publish-reducer";
import profileReducer from "./store/reducer/profile-reducer";
import projectsReducer from "./store/reducer/project-reducer";
import searchReducer from "./store/reducer/search-reducer";
import notificationReducer from "./store/reducer/notification-reducer";
import { LogBox } from "react-native";

const rootReducer = combineReducers({
  auth: authReducer,
  publish: publishReducer,
  profile: profileReducer,
  projects: projectsReducer,
  search: searchReducer,
  notification: notificationReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

LogBox.ignoreAllLogs(true); 

export default function App() {
  const [loadedFonts] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!loadedFonts) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
