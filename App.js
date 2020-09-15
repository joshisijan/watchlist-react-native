import { createBottomTabNavigator } from "react-navigation-tabs";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import AccountScreen from "./src/screens/AccountScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SearchScreen from "./src/screens/SearchScreen";
import LoginScreen from "./src/screens/LoginScreen";
import { setNavigator } from "./src/navigationRef";
import React from "react";
import * as color from './src/colors';

const navigation = createSwitchNavigator(
  {
    loginFlow: LoginScreen,
    mainFlow: createBottomTabNavigator(
      {
        Home: HomeScreen,
        Search: SearchScreen,
        Account: AccountScreen,
      },
      {
        defaultNavigationOptions: {
          tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: color.sand,
            inactiveBackgroundColor: color.black,
            activeBackgroundColor: color.black,
            style: {
              borderTopWidth: 0,
            }
          },
        }
      }
    ),
  },
  {
    initialRouteName: "mainFlow",
  }
);

const App = createAppContainer(navigation);

export default () => {
  return (
    <App
      ref={(navigator) => {
        setNavigator(navigator);
      }}
    />
  );
};

