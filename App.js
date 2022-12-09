import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AppNavigationContainer from "./src/navigation";

const App = () => {
  return (
    <HiddenKeyboard>
      <SafeAreaProvider>
        <AppNavigationContainer />
      </SafeAreaProvider>
    </HiddenKeyboard>
  );
};

const HiddenKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>{children}</TouchableWithoutFeedback>
);

export default App;
