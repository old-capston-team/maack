import { Text, View, Button } from "react-native";
import styles from "../styles/styles";
import Logger from "../utils/Logger";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect } from "react";

export default function WebSocketPage() {
  const socketUrl = "ws://222.98.35.241:80/tracking_progress";

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    Logger.log(connectionStatus);
  }, [connectionStatus]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 64 }}>WebSocket</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          onPress={() => {
            sendMessage(JSON.stringify({ sheet_name: "hello" }));
            Logger.log(connectionStatus);
            if (lastMessage) {
              Logger.log(lastMessage.data);
            }
          }}
          title="Send hello"
        />
      </View>
    </View>
  );
}
