import { Text, View } from "react-native";
import styles from "../styles/styles";
import { Image } from "expo-image";

export default function ImagePage() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 64 }}>Image</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Image source="forest" style={{ width: 200, height: 200 }} />
      </View>
    </View>
  );
}
