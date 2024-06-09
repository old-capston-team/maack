import { Text, View, Button, StyleSheet } from "react-native";
import ListView from "../components/ListView";

export default function ListPage() {
  const items = [
    { title: "악보 1", image: "kingbee" },
    { title: "악보 2", image: "kingbee" },
    { title: "악보 3", image: "kingbee" },
    { title: "악보 4", image: "kingbee" },
    { title: "악보 5", image: "kingbee" },
    { title: "악보 6", image: "kingbee" },
    { title: "악보 7", image: "kingbee" },
    { title: "악보 8", image: "kingbee" },
    { title: "악보 9", image: "kingbee" },
    { title: "악보 10", image: "kingbee" },
    { title: "악보 11", image: "kingbee" },
    { title: "악보 12", image: "kingbee" },
    { title: "악보 13", image: "kingbee" },
  ];

  return (
    <View style={{ flex: 1, alignSelf: "stretch" }}>
      <View style={styles.container}>
        <Text style={{ fontSize: 30 }}>내 악보</Text>
        <Button title="삭제" />
      </View>
      <ListView items={items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 30,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});
