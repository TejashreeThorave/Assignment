import React, { useId, useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainLayout } from "../layouts";
import { FormInfo } from "../components";
import { ScreenConstant } from "../const";
import { BackIcon } from "../assets/images";
import storage from "@react-native-firebase/storage";

const AddScreen = () => {
  const navigation = useNavigation();
  const [filePath, setFilePath] = useState({});
  const [married, setMarried] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState();

  const id = useId();

  const isDisabled = useMemo(
    () => Object.values(filePath).length === 0 || !firstName || !lastName || !birthDay,
    [filePath, firstName, lastName, birthDay],
  );

  const onSave = async () => {
    const imageUrl = await uploadImage();
    firestore()
      .collection("Users")
      .add({
        id,
        firstName,
        lastName,
        birthDay,
        married,
        photoUrl: imageUrl,
        createTime: firestore.Timestamp.fromDate(new Date()),
      })
      .then(() => {
        Alert.alert("Post published!", "Your post has been published Successfully!");
        setPost(null);
      })
      .catch((error) => {
        Alert.alert("Something went wrong with added item");
        console.log("Something went wrong with added post to firestore.", error);
      })
      .finally(() => {
        navigation.navigate(ScreenConstant.HOME);
      });
  };

  const uploadImage = async () => {
    if (filePath.assets[0].uri == null) {
      return null;
    }
    const uploadUri = filePath.assets[0].uri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);

    // Add timestamp to File Name
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    try {
      await task;
      const url = await storageRef.getDownloadURL();
      setFilePath({});
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <MainLayout>
      <View style={styles.container}>
        <View style={{ justifyContent: "center", marginBottom: 8 }}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{ position: "absolute", left: 0, width: 24 }}>
            <Image source={BackIcon} />
          </TouchableOpacity>
          <Text style={{ fontSize: 32, fontWeight: "bold", alignSelf: "center" }}>
            Add New Item
          </Text>
        </View>
        <FormInfo
          filePath={filePath.assets?.[0]?.fileName ?? ""}
          firstName={firstName}
          lastName={lastName}
          birthDay={birthDay}
          married={married}
          onSubmit={onSave}
          onChangeFirstName={setFirstName}
          onChangeLastName={setLastName}
          onChangeBirthDay={setBirthDay}
          onChangeMarried={setMarried}
          onChangeFile={setFilePath}
          isDisabledButton={isDisabled}
        />
      </View>
    </MainLayout>
  );
};

export default AddScreen;

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
