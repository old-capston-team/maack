import { Text, View, Button, StyleSheet } from "react-native";
import ListView from "../components/ListView";

const image = require("../assets/music/kingbee.jpeg");

export default function ListPage() {
  const items = [
    { title: "악보 1", image: image },
    { title: "악보 2", image: image },
    { title: "악보 3", image: image },
    { title: "악보 4", image: image },
    { title: "악보 5", image: image },
    { title: "악보 6", image: image },
    { title: "악보 7", image: image },
    { title: "악보 8", image: image },
    { title: "악보 9", image: image },
    { title: "악보 10", image: image },
    { title: "악보 11", image: image },
    { title: "악보 12", image: image },
    { title: "악보 13", image: image },
  ];

  return (
    <View style={{ backgroundColor: "red", flex: 1, alignSelf: "stretch" }}>
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
    backgroundColor: "blue",
    marginTop: 30,
    height: 50,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
  },
});
