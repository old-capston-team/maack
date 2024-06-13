import IconCard from "../components/IconCard";
import MusicCard from "../components/MusicCard";
import { View, Text, StyleSheet } from "react-native";

const thumbnailURL = `http://${process.env.EXPO_PUBLIC_CDN_HOST}/assets/pdf_thumbnail_1.jpg`;

export default function widgetTestPage() {
  const items = Array.from({ length: 10 }, (_, i) => i);
  return (
    <View>
      <Text>Widget Test Page</Text>
      <View style={styles.container}>
        {items.map((item) => (
          <MusicCard
            key={item}
            thumbnail={thumbnailURL}
            title="Ocarina medley"
            onPress={() => {
              console.log("press " + item);
            }}
          />
        ))}
        <IconCard icon="pluscircleo" title="악보 추가" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
});
