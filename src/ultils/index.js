import { Alert, Platform } from "react-native";

export const uploadImage = async (uri, fallBack) => {
  try {
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    let filename = uploadUri.substring(uploadUri.lastIndexOf("/") + 1);
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;
    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);
    await task;
    const url = await storageRef.getDownloadURL();
    return url;
  } catch (e) {
    Alert.alert("Error", "Something went wrong with added item", [
      {
        text: "OK",
        onPress: () => {
          fallBack?.();
        },
      },
    ]);
    return null;
  }
};
