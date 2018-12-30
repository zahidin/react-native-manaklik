import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from "react-navigation"; 

// import screen
import Home from './screens/Home'
import Cart from './screens/Cart'

const Appnavigator = createStackNavigator(
  {
    Home:Home,
    Cart:Cart
  },{
    initialRouteName:'Home',
  }
)

export default createAppContainer(Appnavigator)