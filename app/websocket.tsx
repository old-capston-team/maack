import { Text, View, Button } from "react-native";
import styles from "../styles/styles";
import Logger from "../utils/Logger";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { useEffect, useRef, useState } from "react";
import useRecording from "../hooks/useRecording";
import Constants from "expo-constants";

export default function WebSocketPage() {
  const socketUrl = `ws://${process.env.EXPO_PUBLIC_AI_HOST}/echo`;
  console.log(socketUrl);
  const timerRef = useRef<any>();
  const [startRecording, stopRecording] = useRecording(
    (recording) => {
      console.log("new recording: " + recording.substring(0, 100) + "...");
    },
    (err) => {
      console.error("recording Error: " + err);
    },
  );

  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  // useEffect(() => {
  //   Logger.log(connectionStatus);
  // }, [connectionStatus]);

  useEffect(() => {
    if (lastMessage) Logger.log("lastMessage: " + lastMessage.data);
  }, [lastMessage]);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 64 }}>WebSocket</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          onPress={() => {
            sendMessage(JSON.stringify({ sheet_music_id: 1 }));
            // Logger.log(connectionStatus);
            // startRecording();
            // timerRef.current = setInterval(async () => {
            //   await stopRecording();
            //   await startRecording();
            // }, 5000);
          }}
          title="Send hello"
        />
      </View>
    </View>
  );
}
