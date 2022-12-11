import React, { useEffect, useState } from "react";
import {
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { RemoveIcon } from "../assets/images";
import { renderForAndroid, renderForIOS } from "../screens/HomeScreen";
import AppButton from "./AppButton";
import AppInput from "./AppInput";
import DatePicker from "react-native-date-picker";
import { format } from "date-fns";
import { useIsFocused } from "@react-navigation/native";

const FormInfo = ({
  filePath,
  firstName,
  lastName,
  birthDay,
  married,
  onSubmit,
  onChangeFirstName,
  onChangeLastName,
  onChangeBirthDay,
  onChangeMarried,
  onChangeFile,
  isDisabledButton,
}) => {
  const [open, setOpen] = useState(false);
  const isFocused = useIsFocused();

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        Alert.alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        Alert.alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        Alert.alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        Alert.alert(response.errorMessage);
        return;
      }
      onChangeFile(response);
    });
  };

  useEffect(() => {
    if (!isFocused) {
      setOpen(false);
    }
  }, [isFocused]);

  return (
    <>
      <AppInput
        inputProps={{ placeholder: "Enter First Name" }}
        value={firstName}
        onChangeValue={onChangeFirstName}
      />
      <AppInput
        inputProps={{ placeholder: "Enter Last Name" }}
        value={lastName}
        onChangeValue={onChangeLastName}
      />
      <AppInput
        inputProps={{ placeholder: "Enter Date of birth", editable: false }}
        value={birthDay}
        onChangeValue={onChangeBirthDay}
        onPress={() => {
          setOpen(true);
        }}
      />
      <DatePicker
        modal
        mode="date"
        open={open}
        date={Boolean(birthDay) ? new Date(birthDay) : new Date()}
        onConfirm={(date) => {
          Keyboard.dismiss();
          setOpen(false);
          const formattedDate = format(new Date(date), "yyyy-MM-dd");
          onChangeBirthDay(formattedDate);
        }}
        onCancel={() => {
          Keyboard.dismiss();
          setOpen(false);
        }}
      />
      <View style={{ alignSelf: "flex-start", marginTop: 18 }}>
        {Platform.OS === "ios"
          ? renderForIOS(married, false, onChangeMarried)
          : renderForAndroid(married, false, onChangeMarried)}
      </View>
      <View style={{ marginTop: 16, alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={styles.buttonStyle}
          onPress={() => chooseFile("photo")}>
          <Text style={styles.textStyle}>Upload Photo</Text>
        </TouchableOpacity>
        {filePath && (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 4,
            }}>
            <Text style={styles.namePhoto}>{filePath}</Text>
            <TouchableOpacity
              onPress={() => {
                onChangeFile({});
              }}>
              <Image source={RemoveIcon} style={{ width: 16, height: 16 }} />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <AppButton
        onPress={onSubmit}
        label="Save"
        style={{ marginTop: 24, alignSelf: "center" }}
        disabled={isDisabledButton}
      />
    </>
  );
};

export default FormInfo;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, width: "100%" },
  textStyle: { color: "#fff" },
  namePhoto: {
    color: "blue",
    marginRight: 8,
    fontSize: 12,
  },
  buttonStyle: {
    borderColor: "#999",
    borderWidth: 1,
    width: 100,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#999",
    borderRadius: 8,
  },
});
