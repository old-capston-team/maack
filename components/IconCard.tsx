import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image, ImageSource } from "expo-image";
import CardBase, { CardBaseProps } from "./CardBase";
import { AntDesign } from "@expo/vector-icons";

interface IconCardProps extends CardBaseProps {
  icon: string;
  title?: string;
  size?: number;
  color?: string;
}

export default function IconCard(props: IconCardProps) {
  return (
    <CardBase onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <AntDesign
            name={props.icon}
            size={props.size || 24}
            color={props.color || "#000"}
          />
        </View>
        <Text style={styles.title}>{props.title}</Text>
      </View>
    </CardBase>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    marginTop: 16,
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
  },
});
