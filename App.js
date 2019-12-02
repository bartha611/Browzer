import React, { useState, useEffect } from "react";
import fetchMovies from "./backend/fetchdata";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./components/Home/home";

const RootStack = createStackNavigator({
  Home: HomeScreen
});

const App = createAppContainer(RootStack);

export default App;
