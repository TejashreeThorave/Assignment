import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainLayout } from "../layouts";
import { AppInput, AppSelect } from "../components";
import AppButton from "../components/AppButton";
import { launchImageLibrary } from "react-native-image-picker";

const AddScreen = () => {
  const navigation = useNavigation();
  const [filePath, setFilePath] = useState({});
  const [married, setMarried] = useState({ value: "1", label: "No" });

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        alert("User cancelled camera picker");
        return;
      } else if (response.errorCode == "camera_unavailable") {
        alert("Camera not available on device");
        return;
      } else if (response.errorCode == "permission") {
        alert("Permission not satisfied");
        return;
      } else if (response.errorCode == "others") {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response);
    });
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <Text style={{ fontSize: 32, fontWeight: "bold", alignSelf: "center", marginBottom: 24 }}>
          Add New Item
        </Text>
        <AppInput label={"First Name"} inputProps={{ placeholder: "Enter First Name" }} />
        <AppInput
          label={"Last Name"}
          inputProps={{ placeholder: "Enter Last Name" }}
          style={{ marginTop: 8 }}
        />
        <AppInput
          label={"Date of birth"}
          inputProps={{ placeholder: "Enter Date of birth" }}
          style={{ marginTop: 8 }}
        />
        <AppSelect
          label="Married"
          data={[
            { value: "0", label: "Yes" },
            { value: "1", label: "No" },
          ]}
          selected={married}
          onSelect={setMarried}
          style={{ marginTop: 8 }}
        />
        <View style={{ marginTop: 8 }}>
          <Text style={styles.textStyle}>{filePath.uri}</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => chooseFile("photo")}>
            <Text style={styles.textStyle}>Choose Image</Text>
          </TouchableOpacity>
        </View>
        <AppButton
          onPress={() => {}}
          label="Add New"
          style={{ marginTop: 24, alignSelf: "center" }}
        />
      </View>
    </MainLayout>
  );
};

export default AddScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  textStyle: {},
});
