import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import CardBase, { CardBaseProps } from "./CardBase";

interface IconCardProps extends CardBaseProps {
  title?: string | undefined;
  size?: number | undefined;
  color?: string | undefined;
}

export default function IconCard(props: IconCardProps) {
  return (
    <CardBase onPress={props.onPress}>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <ActivityIndicator
            size={props.size || "large"}
            color={props.color || "#101827"}
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
    color: "#777",
  },
});
