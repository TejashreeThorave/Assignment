import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";
import { MainLayout } from "../layouts";

const EditScreen = () => {
  const navigation = useNavigation();

  return (
    <MainLayout>
      <Text>HOME</Text>
    </MainLayout>
  );
};

export default EditScreen;
