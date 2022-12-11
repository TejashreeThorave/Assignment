import React, { memo } from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MainLayout = ({ children }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        alignItems: "center",
        paddingBottom: 40,
      }}>
      {children}
    </View>
  );
};

export default memo(MainLayout);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});
