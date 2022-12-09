import React, { useRef, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  View,
  Image,
  Dimensions,
} from "react-native";
import { ArrowDown } from "../assets/images";

const AppSelect = ({ label, data, onSelect, style, isRequire, placeholder, selected }) => {
  const DropdownButton = useRef();
  const [visible, setVisible] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);

  const toggleDropdown = () => {
    visible ? setVisible(false) : openDropdown();
  };

  const openDropdown = () => {
    DropdownButton?.current?.measure((_fx, _fy, _w, h, _px, py) => {
      setDropdownTop(py + h);
    });
    setVisible(true);
  };

  const onItemPress = (item) => {
    onSelect(item);
    setVisible(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text style={{ color: "#fff", fontSize: 16 }}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderDropdown = () => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={style}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={styles.label}>{label}</Text>
        {isRequire && <Text style={{ color: "red" }}>*</Text>}
      </View>
      <TouchableOpacity ref={DropdownButton} style={styles.button} onPress={toggleDropdown}>
        {renderDropdown()}
        <Text
          style={[
            styles.buttonText,
            {
              color: Object.values(selected).length > 0 ? "#333333" : "#BBBBBB",
            },
          ]}>
          {selected?.label ?? placeholder}
        </Text>
        <Image
          source={ArrowDown}
          style={{
            width: 24,
            height: 24,
            position: "absolute",
            right: 16,
            alignSelf: "center",
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AppSelect;

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    height: 48,
    zIndex: 1,
    borderRadius: 10,
    borderColor: "#999999",
    borderWidth: 1,
  },
  buttonText: {
    flex: 1,
    alignSelf: "center",
    paddingHorizontal: 16,
    borderRadius: 10,
    textAlign: "left",
    fontSize: 16,
  },
  dropdown: {
    position: "absolute",
    backgroundColor: "#1976D2",
    borderRadius: 10,
    width: Dimensions.get("window").width - 32,
    marginLeft: 16,
    marginTop: 4,
  },
  overlay: {
    width: "100%",
    height: "100%",
  },
  item: {
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: "#444444",
  },
});
