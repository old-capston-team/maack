import { View, Text, Button, Modal } from "react-native";
import styles from "../styles/styles";
import { useEffect, useRef, useState } from "react";
import MusicView from "../components/MusicView";
import useRecording from "../hooks/useRecording";
import { useRouter } from "expo-router";
import useWebSocket from "../hooks/useWebSocket";

export default function TestPage() {
  const router = useRouter();
  const musicViewRef = useRef<any>();
  const [isMusicLoaded, setIsMusicLoaded] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout>();
  const url =
    "https://s3.ap-northeast-2.amazonaws.com/maack.bucket/musicxml/9cc20038-731b-4022-a6a8-5c8a5f2e430e.xml";
  const socketUrl = `ws://${process.env.EXPO_PUBLIC_AI_HOST}/tracking_progress`;
  const { connect, disconnect, sendMessage, isOpen } = useWebSocket(
    (message) => {
      const response = JSON.parse(message);
      musicViewRef?.current?.jumpTo(response.best_end);

      if (response.isFinished) {
        clearInterval(intervalRef.current);
        disconnect();
        setIsEnd(true);
      }
    },
    (err) => {
      console.error("websocket error: " + err);
    },
  );
  const [startRecording, stopRecording] = useRecording(
    (recording) => {
      sendMessage(JSON.stringify({ recording: recording }));
    },
    (err) => {
      console.error("recording error: " + err);
    },
  );

  useEffect(() => {
    connect(socketUrl);
    return () => {
      disconnect();
    };
  }, []);

  useEffect(() => {
    if (isOpen && isMusicLoaded) {
      sendMessage(JSON.stringify({ sheet_music_id: 1 }));
      startRecording();

      intervalRef.current = setInterval(async () => {
        await stopRecording();
        startRecording();
      }, 2000);

      return () => {
        clearInterval(intervalRef.current);
        stopRecording();
      };
    }
  }, [isOpen, isMusicLoaded]);

  return (
    <View style={styles.container}>
      <Text>{isOpen ? "Connected" : "Disconnected"}</Text>
      <MusicView
        ref={musicViewRef}
        url={url}
        onLoaded={() => {
          setIsMusicLoaded(true);
          console.log("music loaded");
        }}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={isEnd}
        onRequestClose={() => {
          setIsEnd(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>연주가 끝났습니다! 😄</Text>
            <View style={styles.modalButtonView}>
              <Button
                title="돌아가기"
                onPress={() => {
                  router.back();
                }}
              />
              <Button
                title="다시 연주하기"
                onPress={() => {
                  musicViewRef?.current?.reset();
                  setIsEnd(false);
                  connect(socketUrl);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
