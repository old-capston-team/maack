import { StyleSheet, TouchableOpacity } from "react-native";

export interface CardBaseProps {
  onPress?: () => void;
  children?: React.ReactNode;
}

export default function CardBase(props: CardBaseProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.5}
      onPress={props.onPress}
    >
      {props.children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    margin: 8,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 150,
    maxWidth: 150,
    maxHeight: 250,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
