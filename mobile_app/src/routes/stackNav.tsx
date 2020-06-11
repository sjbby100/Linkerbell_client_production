import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Start from "../screens/start";
import Signin from "../screens/signIn";
import Signup from "../screens/signUp";
import Loding from "../screens/loading";
import UserDetail from "../screens/userDetail";
import Home from "../screens/home";

const StackNav = (): JSX.Element => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{ header: () => null }}
    >
      <Stack.Screen name="Start" component={Start} />
      <Stack.Screen name="Loading" component={Loding} />
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="UserDetail" component={UserDetail} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default StackNav;