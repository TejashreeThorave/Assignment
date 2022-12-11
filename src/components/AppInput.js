import React from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";

const AppInput = ({
  label,
  error,
  onFocus,
  inputProps,
  labelTypes,
  inputContainerType,
  inputType,
  isRequire,
  value,
  style,
  onChangeValue,
  isHiddenErrorMessage,
  onPress,
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  return (
    <View style={style}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={[styles.label, labelTypes]}>{label}</Text>
        {isRequire && <Text style={{ color: "red" }}>*</Text>}
      </View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          Boolean(onPress) && onPress();
        }}
        style={[
          styles.inputContainer,
          inputContainerType,
          {
            borderColor: error ? "red" : isFocused ? "blue" : "#999999",
            alignItems: "center",
          },
        ]}>
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            Boolean(onFocus) && onFocus?.();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          style={[styles.input, inputType]}
          onChangeText={onChangeValue}
          value={value}
          pointerEvents={Boolean(onPress) && "none"}
          {...inputProps}
        />
      </TouchableOpacity>
      {Boolean(error) && isHiddenErrorMessage && (
        <Text style={{ marginTop: 7, color: "red", fontSize: 12 }}>{error}</Text>
      )}
    </View>
  );
};

AppInput.defaultProps = {
  isPasswordType: false,
  isRequire: false,
};

const styles = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: "#444444",
  },
  inputContainer: {
    height: 48,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 10,
  },
  input: {
    color: "#424242",
    flex: 1,
    height: "100%",
    width: "100%",
    paddingHorizontal: 12,
    fontSize: 16,
    borderRadius: 10,
  },
});

export default AppInput;
