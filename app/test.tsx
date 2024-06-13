import { View, Text, Button } from "react-native";
import styles from "../styles/styles";
import { useEffect, useRef, useState } from "react";
import MusicView from "../components/MusicView";
import useRecording from "../hooks/useRecording";
import useWebSocket, { ReadyState } from "react-use-websocket";
import Logger from "../utils/Logger";

export default function TestPage() {
  const musicViewRef = useRef<any>();
  const intervalRef = useRef<any>();
  const [musicLoaded, setMusicLoaded] = useState(false);
  const url =
    "https://s3.ap-northeast-2.amazonaws.com/maack.bucket/musicxml/9cc20038-731b-4022-a6a8-5c8a5f2e430e.xml";
  const socketUrl = `ws://${process.env.EXPO_PUBLIC_AI_HOST}/tracking_progress`;
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
  const [startRecording, stopRecording] = useRecording(
    (recording) => {
      sendMessage(JSON.stringify({ recording: recording }));
    },
    (err) => {
      console.error("recording error: " + err);
    },
  );

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    console.log("status changed?");
    Logger.log(connectionStatus);
    if (connectionStatus === "Open" && !intervalRef) {
      console.log("recording started");
      sendMessage(JSON.stringify({ sheet_music_id: 1 }));
      startRecording();
      intervalRef.current = setInterval(async () => {
        await stopRecording();
        startRecording();
      }, 2000);
    }

    return () => {
      intervalRef.current?.clear();
    };
  }, [connectionStatus, musicLoaded]);

  useEffect(() => {
    if (lastMessage && musicViewRef?.current) {
      const response = JSON.parse(lastMessage.data);
      console.log(response.best_end);
      musicViewRef?.current?.jumpTo(response.best_end);
      console.log("message sent to webview");
    }
  }, [lastMessage?.data]);

  console.log("re-render");
  return (
    <View style={styles.container}>
      <MusicView
        ref={musicViewRef}
        url={url}
        onLoaded={() => {
          setMusicLoaded(true);
          console.log("music loaded");
        }}
      />
      <Text>{lastMessage ? lastMessage.data : ""}</Text>
    </View>
  );
}
