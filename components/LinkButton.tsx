import { Text, Pressable, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function LinkButton({ title, href }) {
  return (
    <Link href={href} asChild>
      <Pressable style={styles.container}>
        {({ pressed }) => (
          <Text style={[styles.text, pressed ? styles.textPressed : null]}>
            {title}
          </Text>
        )}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    backgroundColor: "#0000",
    alignItems: "center",
    justifyContent: "center",
    padding: 4,
  },
  text: {
    color: "#000",
    fontSize: 20,
  },
  textPressed: {
    color: "#aaa",
  },
});
