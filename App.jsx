import React from "react";
import { Provider } from "react-redux";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import store from "./reducer";

import HomeScreen from "./components/Home/home";
import ReviewScreen from "./components/Reviews/review"

const RootStack = createStackNavigator({
  Home: HomeScreen,
  Review: ReviewScreen
});

const Navigation = createAppContainer(RootStack);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
