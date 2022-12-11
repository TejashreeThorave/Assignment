import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { Alert, Platform } from "react-native";
import { storage } from "../../firebase";

export const uploadImage = async (uri, fallBack) => {
  try {
    const uploadUri = Platform.OS === "ios" ? uri.replace("file://", "") : uri;
    let filename = uri.substring(uri.lastIndexOf("/") + 1);
    const extension = filename.split(".").pop();
    const name = filename.split(".").slice(0, -1).join(".");
    filename = name + Date.now() + "." + extension;
    const storageRef = ref(storage, `photos/${filename}`);
    const blob = await uriToBlob(uploadUri);
    await uploadBytesResumable(storageRef, blob);
    let url;
    await getDownloadURL(storageRef).then((link) => {
      url = link;
    });
    blob.close();
    return url;
  } catch (e) {
    console.log(e);
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

const uriToBlob = (uri) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });
};
