import { Text, View, Button, StyleSheet } from "react-native";
import ListView from "../components/ListView";
import { useEffect, useState } from "react";
import { getMyMusic } from "../services/musicService";
import { chopName } from "../utils/chopName";

export default function ListPage() {
  const [items, setItems] = useState([]);
  const thumbnailURL = `http://${process.env.EXPO_PUBLIC_CDN_HOST}/assets/pdf_thumbnail_1.jpg`;

  useEffect(() => {
    getMyMusic().then((musics) => {
      setItems(
        musics.map((music) => {
          return {
            id: music.pdfFileId,
            title: chopName(music.fileName),
            image: thumbnailURL,
          };
        }),
      );
    });
  }, []);

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
