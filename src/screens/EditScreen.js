import React, { useMemo, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainLayout } from "../layouts";
import { FormInfo } from "../components";
import { ScreenConstant } from "../const";
import { BackIcon } from "../assets/images";

const EditScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { params } = route;
  const [filePathEdit, setFilePathEdit] = useState(params.filePath ?? {});
  const [marriedEdit, setMarriedEdit] = useState(params.married ?? false);
  const [firstNameEdit, setFirstNameEdit] = useState(params.firstName ?? "");
  const [lastNameEdit, setLastNameEdit] = useState(params.lastName ?? "");
  const [birthDayEdit, setBirthDayEdit] = useState(params.dateOfBirth ?? "");

  const isDisabled = useMemo(
    () =>
      Object.values(filePathEdit).length === 0 || !firstNameEdit || !lastNameEdit || !birthDayEdit,
    [filePathEdit, firstNameEdit, lastNameEdit, birthDayEdit],
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
          <Text style={{ fontSize: 32, fontWeight: "bold", alignSelf: "center" }}>Edit Item</Text>
        </View>
        <FormInfo
          filePath={filePathEdit.assets[0].fileName}
          firstName={firstNameEdit}
          lastName={lastNameEdit}
          birthDay={birthDayEdit}
          married={marriedEdit}
          onSubmit={onSave}
          onChangeFirstName={setFirstNameEdit}
          onChangeLastName={setLastNameEdit}
          onChangeBirthDay={setBirthDayEdit}
          onChangeMarried={setMarriedEdit}
          onChangeFile={setFilePathEdit}
          isDisabledButton={isDisabled}
        />
      </View>
    </MainLayout>
  );
};

export default EditScreen;

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
