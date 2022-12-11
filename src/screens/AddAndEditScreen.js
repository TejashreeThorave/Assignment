import React, { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainLayout } from "../layouts";
import { FormInfo } from "../components";
import { ScreenConstant } from "../const";
import { BackIcon } from "../assets/images";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { uploadImage } from "../ultils";

const AddAndEditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  const [filePath, setFilePath] = useState(params?.source ?? {});
  const [married, setMarried] = useState(params?.married ?? false);
  const [firstName, setFirstName] = useState(params?.firstName ?? "");
  const [lastName, setLastName] = useState(params?.lastName ?? "");
  const [birthDay, setBirthDay] = useState(params?.dateOfBirth ?? "");
  const [loading, setLoading] = useState(false);

  const isDisabled = useMemo(
    () => Object.values(filePath).length === 0 || !firstName || !lastName || !birthDay || loading,
    [filePath, firstName, lastName, birthDay, loading],
  );

  const onSave = async () => {
    try {
      setLoading(true);
      let imageUrl = filePath;

      if (typeof filePath === "object") {
        imageUrl = await uploadImage(filePath.assets[0].uri, () =>
          navigation.navigate(ScreenConstant.HOME),
        );
      }

      if (imageUrl) {
        const newData = {
          id: params?.userId,
          firstName,
          lastName,
          birthDay,
          married,
          photoUrl: imageUrl,
        };
        if (params?.type === "add") {
          addDoc(collection(db, "Users"), newData)
            .then(() => {
              Alert.alert("Post published!", "Your post has been published Successfully!", [
                { text: "OK", onPress: () => navigation.navigate(ScreenConstant.HOME) },
              ]);
            })
            .catch((error) => {
              Alert.alert("Error", "Something went wrong with added item", [
                { text: "OK", onPress: () => navigation.navigate(ScreenConstant.HOME) },
              ]);
            });
        } else {
          const washingtonRef = doc(db, "Users", params.docId);
          updateDoc(washingtonRef, newData).then(() => {
            Alert.alert("Post published!", "Your edit has been published Successfully!", [
              { text: "OK", onPress: () => navigation.navigate(ScreenConstant.HOME) },
            ]);
          });
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert("Error", "Something went wrong with added item", [
        { text: "OK", onPress: () => navigation.navigate(ScreenConstant.HOME) },
      ]);
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
          <Text style={{ fontSize: 32, fontWeight: "bold", alignSelf: "center", color: "#000" }}>
            {params?.type === "add" ? "Add New Item" : "Edit Item"}
          </Text>
        </View>
        <FormInfo
          filePath={typeof filePath === "object" ? filePath.assets?.[0]?.fileName ?? "" : filePath}
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

export default AddAndEditScreen;

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
