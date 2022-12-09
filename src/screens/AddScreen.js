import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainLayout } from "../layouts";
import { FormInfo } from "../components";
import { ScreenConstant } from "../const";
import { BackIcon } from "../assets/images";

const AddScreen = () => {
  const navigation = useNavigation();
  const [filePath, setFilePath] = useState({});
  const [married, setMarried] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDay, setBirthDay] = useState();

  const isDisabled = useMemo(
    () => Object.values(filePath).length === 0 || !firstName || !lastName || !birthDay,
    [filePath, firstName, lastName, birthDay],
  );

  const onSave = () => {
    navigation.navigate(ScreenConstant.HOME);
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
          filePath={filePath}
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
