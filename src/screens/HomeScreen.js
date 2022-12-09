import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MainLayout } from "../layouts";
import { AddIcon, DeleteIcon } from "../assets/images";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import { ScreenConstant } from "../const";

const tableHead = ["ID", "First Name", "Last Name", "Date of birth", "Married", "Photo", ""];
const widthArr = [40, 90, 90, 100, 120, 140, 160];
const tableData = [
  [1, "Dinh", "Tran Son", "27/03/200", true, "asdasd", ""],
  [2, "Dinh", "Tran Son", "27/03/200", false, "asdasd", ""],
  [3, "Dinh", "Tran Son", "27/03/200", true, "asdasd", ""],
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const element = (data, index) => (
    <TouchableOpacity onPress={() => alert("asdasd")} style={{ alignItems: "center" }}>
      <Image source={DeleteIcon} style={{ width: 24, height: 24 }} />
    </TouchableOpacity>
  );

  return (
    <MainLayout>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenConstant.ADD)}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#537791",
            width: 50,
            height: 32,
            borderRadius: 10,
            marginBottom: 8,
            alignSelf: "flex-end",
          }}>
          <Image source={AddIcon} style={{ width: 12, height: 12 }} />
          <Text style={{ color: "#fff", fontWeight: "500" }}>Add</Text>
        </TouchableOpacity>
        <ScrollView>
          <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
            <Row
              data={tableHead}
              widthArr={widthArr}
              style={styles.header}
              textStyle={styles.textHeader}
            />
          </Table>
          <View>
            <ScrollView style={styles.dataWrapper}>
              <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                {tableData.map((rowData, index) => (
                  <TableWrapper
                    key={index}
                    style={{
                      flexDirection: "row",
                      backgroundColor: index % 2 === 0 ? "#F7F6E7" : "#fff",
                    }}>
                    {rowData.map((cellData, cellIndex) => (
                      <Cell
                        key={cellIndex}
                        data={cellIndex === 6 ? element(cellData, index) : cellData}
                        textStyle={{ textAlign: "center", fontWeight: "100" }}
                        width={widthArr[cellIndex]}
                      />
                    ))}
                  </TableWrapper>
                ))}
              </Table>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </MainLayout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: "#E7E6E1" },
});
