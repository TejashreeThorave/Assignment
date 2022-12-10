import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AddAndEditScreen, HomeScreen } from "../screens";
import { ScreenConstant } from "../const";

const AppNavigationContainer = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ScreenConstant.HOME}
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ScreenConstant.HOME} component={HomeScreen} />
        <Stack.Screen name={ScreenConstant.ADD_AND_EDIT} component={AddAndEditScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
