import { Stack } from "expo-router";
import { Text, View } from "react-native";
import Logger from "../utils/Logger";
import { useState } from "react";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  const [log, setLog] = useState<string>();

  Logger.setOnLogChange(setLog);

  return (
    <>
      <RootSiblingParent>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: "#101827",
            },
            headerTintColor: "#fff",
            headerTitleStyle: {
              fontWeight: "normal",
            },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="test" />
          <Stack.Screen name="list" />
          <Stack.Screen name="login" />
          <Stack.Screen name="websocket" />
          <Stack.Screen name="document" />
          <Stack.Screen name="image" />
          <Stack.Screen name="widgetTest" />
        </Stack>
        <View style={styles.logBox}>
          <Text testID="pressable_press_console">{log}</Text>
        </View>
      </RootSiblingParent>
    </>
  );
}

const styles = {
  logBox: {
    padding: 20,
    margin: 10,
    borderWidth: 1,
    backgroundColor: "#f0f0f0",
  },
};
