import React, { memo } from "react";
import { View } from "react-native";
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
