import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";

const AppButton = ({ disabled, style, styleLabel, label, children, onPress }) => (
  <TouchableOpacity
    style={[styles.buttonContainer, style, disabled && styles.bgDisable]}
    disabled={disabled}
    onPress={onPress}>
    {children ?? <Text style={[styles.label, styleLabel]}>{label}</Text>}
  </TouchableOpacity>
);

export default memo(AppButton);

const styles = StyleSheet.create({
  label: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 24,
  },
  bgDisable: {
    backgroundColor: "#9E9E9E",
    borderWidth: 0,
  },
  buttonContainer: {
    backgroundColor: "#1976D2",
    width: 148,
    height: 48,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
