import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import LinkButton from "../components/LinkButton";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <LinkButton title="Login" href="/login" />
      <LinkButton title="List" href="/list" />
      <LinkButton title="Test" href="/test" />
      <LinkButton title="WebSocket" href="/websocket" />
      <LinkButton title="Document" href="/document" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
