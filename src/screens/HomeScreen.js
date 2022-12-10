import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainLayout } from "../layouts";
import { AddIcon, DeleteIcon } from "../assets/images";
import { ScreenConstant } from "../const";
import CheckBox from "@react-native-community/checkbox";

const DATA = [
  {
    id: 1,
    firstName: "Jonny",
    lastName: "Trasd",
    dateOfBirth: "27/03/1890",
    married: true,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    id: 2,
    firstName: "Messis",
    lastName: "Lion",
    dateOfBirth: "27/03/2123",
    married: true,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    id: 3,
    firstName: "Cr7",
    lastName: "Son",
    dateOfBirth: "27/03/2090",
    married: false,
    photoUrl: "https://picsum.photos/200/300",
  },
  {
    id: 4,
    firstName: "Son",
    lastName: "Min",
    dateOfBirth: "27/03/2000",
    married: true,
    photoUrl: "https://picsum.photos/200/300",
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }) => (
    <InfoItem
      id={item.id}
      source={item.photoUrl}
      firstName={item.firstName}
      lastName={item.lastName}
      dateOfBirth={item.dateOfBirth}
      married={item.married}
    />
  );

  return (
    <MainLayout>
      <Text style={{ color: "#1565C0", fontWeight: "700", fontSize: 40, marginTop: 18 }}>
        Main Screen
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate(ScreenConstant.ADD)} style={styles.add}>
        <Image source={AddIcon} style={{ width: 18, height: 18 }} />
      </TouchableOpacity>
      <FlatList
        data={DATA}
        style={{ width: "100%", marginTop: 16 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </MainLayout>
  );
};

const InfoItem = ({ source, firstName, lastName, dateOfBirth, married, id }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.infoItem}
      onPress={() => {
        navigation.navigate(ScreenConstant.EDIT, {
          source,
          firstName,
          lastName,
          dateOfBirth,
          married,
        });
      }}>
      <Image source={{ uri: source }} style={styles.avatar} />
      <View>
        <Text style={{ fontWeight: "700", marginBottom: 4 }}>{`${firstName} ${lastName}`}</Text>
        <Text style={{ marginBottom: 4 }}>{dateOfBirth}</Text>
        {Platform.OS === "ios" ? renderForIOS(married, true) : renderForAndroid(married, true)}
      </View>
      <TouchableOpacity style={{ position: "absolute", right: 24 }}>
        <Image source={DeleteIcon} style={{ height: 40, width: 40 }} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export function renderForIOS(value, disabled, onValueChange) {
  return (
    <View style={styles.container}>
      <Text style={{ marginRight: 8 }}>Married</Text>
      <View style={styles.checkbox}>
        <CheckBox
          value={value}
          onValueChange={onValueChange}
          disabled={disabled}
          style={{ width: 20, height: 20 }}
          hideBox
        />
      </View>
    </View>
  );
}

export function renderForAndroid(value, disabled, onValueChange) {
  return (
    <View style={styles.container}>
      <Text style={{ marginRight: 8 }}>Married</Text>
      <CheckBox value={value} onValueChange={onValueChange} disabled={disabled} />
    </View>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  infoItem: {
    borderBottomColor: "#999",
    borderBottomWidth: 2,
    minHeight: 100,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    width: "100%",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  checkbox: {
    borderWidth: 1,
    borderColor: "#999",
    height: 22,
    width: 22,
    borderRadius: 5,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderColor: "#999",
    borderWidth: 1.5,
    marginRight: 24,
    backgroundColor: "#A3C8ED",
  },
  add: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1565C0",
    width: 40,
    height: 40,
    borderRadius: 10,
    position: "absolute",
    right: 16,
    top: 70,
  },
});
