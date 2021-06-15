import React from "react";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons as Icon } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import NotificationScreen from "../screens/NotificationScreen";
import ProfileScreen from "../screens/ProfileScreen";
import ViewProjectScreen from "../screens/ViewProjectScreen";
import Colors from "../constants/Colors";
import SigninScreen from "../screens/SigninScreen";
import SignupScreen from "../screens/SignupScreen";
import StartupScreen from "../screens/StartupScreen";
import AuthScreen from "../screens/AuthScreen";
import PublishScreen1 from "../components/PublishScreen1";
import PublishScreen2 from "../components/PublishScreen2";
import PublishScreen3 from "../components/PublishScreen3";
import { TouchableOpacity } from "react-native-gesture-handler";
import Avatar from "../components/Avatar";
import MapPreview from "../components/MapPreview";
import NearbyProjectsScreen from "../screens/NearbyProjectsScreen";
import AllProjectsScreen from "../screens/AllProjectsScreen";
import CollaborationScreen from "../screens/CollaborationScreen";
import UserProjectsScreen from "../screens/UserProjectsScreen";

const defaultNavigationConfig = {
  cardStyle: { backgroundColor: "#ffffff" },
};

const NearbyProjectsScreenStack = createStackNavigator(
  {
    Nearby: NearbyProjectsScreen,
    ViewProject: {
      screen: ViewProjectScreen,
    },
    MapPreview: {
      screen: MapPreview,
    },
  },
  {
    defaultNavigationOptions: {
      cardShadowEnabled: false,
      cardStyle: {
        backgroundColor: "#FFFFFF",
      },
      headerStyle: {
        backgroundColor: "#ffffff",
        shadowOffset: { width: 0, height: 0 },
        elevation: 0,
      },
    },
  }
);

const AllProjectsScreenStack = createStackNavigator(
  {
    AllProjects: AllProjectsScreen,
    ViewProject: {
      screen: ViewProjectScreen,
    },
    MapPreview: {
      screen: MapPreview,
    },
  },
  {
    defaultNavigationOptions: {
      cardShadowEnabled: false,
      cardStyle: {
        backgroundColor: "#FFFFFF",
      },
      headerStyle: {
        backgroundColor: "#ffffff",
      },
    },
  }
);

const PublishScreenStack = createStackNavigator(
  {
    Screen1: PublishScreen1,
    Screen2: PublishScreen2,
    Screen3: PublishScreen3,
  },
  {
    navigationOptions: (navData) => {
      return {
        tabBarVisible: false,
        cardStyle: {
          backgroundColor: "white",
        },
      };
    },
  }
);

const NotificationScreenStack = createStackNavigator(
  {
    Notification: NotificationScreen,
  },
  {
    defaultNavigationOptions: defaultNavigationConfig,
  }
);

const ProfileScreenStack = createStackNavigator(
  {
    Profile: ProfileScreen,
    Collaboration: CollaborationScreen,
    UserProjects: UserProjectsScreen,
    ViewProject: ViewProjectScreen,
  },
  {
    defaultNavigationOptions: {
      ...defaultNavigationConfig,
      headerBackImage: () => (
        <TouchableOpacity>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>
      ),
    },
  }
);

const AuthScreenStack = createStackNavigator(
  {
    Auth: AuthScreen,
    Signin: SigninScreen,
    Signup: SignupScreen,
  },
  {
    defaultNavigationOptions: {
      ...defaultNavigationConfig,
      headerStyle: {
        backgroundColor: "#ffffff",
        elevation: 0,
        shadowOffset: { width: 0, height: 0 },
      },
      headerBackImage: () => (
        <TouchableOpacity>
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={Colors.primary}
          />
        </TouchableOpacity>
      ),
    },
  }
);

const Navigator = createBottomTabNavigator(
  {
    AllProjects: {
      screen: AllProjectsScreenStack,
      navigationOptions: () => {
        return {
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "md-home" : "md-home-outline"}
                size={24}
                color="#9FACC8"
              />
            );
          },
        };
      },
    },
    NearbyProjects: {
      screen: NearbyProjectsScreenStack,
      navigationOptions: () => {
        return {
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "md-location" : "md-location-outline"}
                size={24}
                color="#9FACC8"
              />
            );
          },
        };
      },
    },
    PublishScreen: {
      screen: PublishScreenStack,
      navigationOptions: () => {
        return {
          tabBarIcon: () => {
            return (
              <TouchableOpacity
                style={{
                  marginTop: -25,
                  backgroundColor: Colors.primary,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 1000,
                  paddingLeft: 2,
                }}
              >
                <Icon name="md-add" size={30} color="#ffffff" />
              </TouchableOpacity>
            );
          },
        };
      },
    },
    NotificationScreen: {
      screen: NotificationScreenStack,
      navigationOptions: () => {
        return {
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name={focused ? "md-notifications" : "md-notifications-outline"}
                size={24}
                color="#9FACC8"
              />
            );
          },
        };
      },
    },
    ProfileScreen: {
      screen: ProfileScreenStack,
      navigationOptions: () => {
        return {
          tabBarIcon: ({ focused }) => {
            return <Avatar title="Ragul" />;
          },
        };
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      style: {
        borderTopColor: "#D1DDF6",
      },
    },
  }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  AuthScreen: AuthScreenStack,
  Navigator: Navigator,
});

export default createAppContainer(MainNavigator);
