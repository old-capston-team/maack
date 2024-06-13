import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image, ImageSource } from "expo-image";
import CardBase, { CardBaseProps } from "./CardBase";

interface MusicCardProps extends CardBaseProps {
  thumbnail: number | string | ImageSource;
  title: string;
}

export default function MusicCard(props: MusicCardProps) {
  return (
    <CardBase onPress={props.onPress}>
      <Image style={styles.thumbnail} source={props.thumbnail} />
      <Text style={styles.title}>{props.title}</Text>
    </CardBase>
  );
}

const styles = StyleSheet.create({
  thumbnail: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    resizeMode: "contain",
  },
  title: {
    marginTop: 16,
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
});
