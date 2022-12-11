import React, { useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MainLayout } from "../layouts";
import { AddIcon, DeleteIcon } from "../assets/images";
import { ScreenConstant } from "../const";
import CheckBox from "@react-native-community/checkbox";
import { collection, query, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const isFocused = useIsFocused();
  const [userId, setUserId] = useState(1);

  let loadToDoList = async () => {
    setLoading((loading) => !loading);
    const q = query(collection(db, "Users"));

    const querySnapshot = await getDocs(q);

    let list = [];
    querySnapshot.forEach((doc) => {
      let item = doc.data();
      if (item.id >= userId) {
        setUserId(item.id + 1);
      }
      item.docId = doc.id;
      list.push(item);
    });

    setData(list);
    setLoading(false);
  };

  let deleteItem = async (idx) => {
    if (idx) {
      await deleteDoc(doc(db, "Users", idx));
      let newData = [...data].filter((item) => item.docId != idx);
      setData(newData);
    }
  };

  const renderItem = ({ item }) => (
    <InfoItem
      id={item.docId}
      source={item.photoUrl}
      firstName={item.firstName}
      lastName={item.lastName}
      dateOfBirth={item.birthDay}
      married={item.married}
      userId={item.id}
      onDeleteItem={() =>
        Alert.alert("Delete Item", "Are you sure you want to delete?", [
          {
            text: "Cancel",
            onPress: () => {
              console.log("Cancel Delete");
            },
          },
          { text: "OK", onPress: () => deleteItem(item.docId) },
        ])
      }
    />
  );

  useEffect(() => {
    loadToDoList();
  }, [isFocused]);

  return (
    <MainLayout>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
          marginTop: 18,
        }}>
        <Text style={{ color: "#1565C0", fontWeight: "700", fontSize: 40 }}>Main Screen</Text>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate(ScreenConstant.ADD_AND_EDIT, { type: "add", userId })}
          style={styles.add}>
          <Image source={AddIcon} style={{ width: 18, height: 18 }} />
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" />
        </View>
      ) : data?.length > 0 ? (
        <FlatList
          data={data}
          style={{ width: "100%", marginTop: 16 }}
          renderItem={renderItem}
          keyExtractor={(item) => item.docId}
        />
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Text style={{ fontSize: 18 }}>No Data</Text>
        </View>
      )}
    </MainLayout>
  );
};

const InfoItem = ({
  source,
  firstName,
  lastName,
  dateOfBirth,
  married,
  onDeleteItem,
  id,
  userId,
}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.infoItem}
      onPress={() => {
        navigation.navigate(ScreenConstant.ADD_AND_EDIT, {
          type: "edit",
          source,
          firstName,
          lastName,
          dateOfBirth,
          married,
          docId: id,
          userId,
        });
      }}>
      <Image source={{ uri: source }} style={styles.avatar} />

      <View>
        <Text
          style={{
            fontWeight: "700",
            marginBottom: 4,
            color: "#000",
          }}>{`${firstName} ${lastName}`}</Text>
        <Text style={{ marginBottom: 4 }}>{dateOfBirth}</Text>
        {Platform.OS === "ios" ? renderForIOS(married, true) : renderForAndroid(married, true)}
      </View>
      <TouchableOpacity
        style={{ position: "absolute", right: 24 }}
        onPress={onDeleteItem}
        activeOpacity={1}>
        <Image source={DeleteIcon} style={{ height: 40, width: 40 }} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export function renderForIOS(value, disabled, onValueChange) {
  return (
    <View style={styles.container}>
      <Text style={{ marginRight: 8, color: "#000" }}>Married</Text>
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
      <Text style={{ marginRight: 8, color: "#000" }}>Married</Text>
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
  },
});
