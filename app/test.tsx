import { Text, View, Button } from "react-native";
import styles from "../styles/styles";
import { Audio } from "expo-av";
import { useEffect, useRef, useState } from "react";
import WebView from "react-native-webview";

export default function TestPage() {
  const [recording, setRecording] = useState<Audio.Recording>();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [uri, setUri] = useState<string>();
  const [sound, setSound] = useState<Audio.Sound>();
  const webviewRef = useRef<WebView>();

  useEffect(() => {
    return sound
      ? () => {
          console.log("Unloading Sound");
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const playSound = async () => {
    try {
      if (!uri) {
        console.log("No record file.");
        return;
      }
      console.log("Loading Sound");
      const { sound } = await Audio.Sound.createAsync({ uri });
      setSound(sound);

      console.log("Playing Sound");
      await sound.playAsync();
    } catch (err) {
      console.error("Failed to start playing", err);
    }
  };

  const startRecording = async () => {
    try {
      if (permissionResponse.status !== "granted") {
        console.log("Requesting permission...");
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording...");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.LOW_QUALITY,
      );
      setRecording(recording);
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    console.log("Stopping recording...");
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const recordedURI = recording.getURI();
    setUri(recordedURI);
    console.log("Recording stopped and stored at", recordedURI);
  };

  const html = `
<!DOCTYPE html>
<html lang="ko-KR">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>music</title>
  </head>
  <body>
    <div id="osmdContainer"/>
    <div id="debug"></div>
    <script src="https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/releases/download/1.8.8/opensheetmusicdisplay.min.js"></script>
    <script>
      const debug = document.getElementById("debug");
      let osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdContainer");
      let cursor;
      console.log(osmd);
      osmd.setOptions({
        backend: "svg",
        drawTitle: true,
        // drawingParameters: "compacttight" // don't display title, composer etc., smaller margins
      });
      osmd
        .load("https://d25xa25ndkjvmh.cloudfront.net/MozaVeilSample.xml")
        .then(
          function() {
            osmd.render();
            cursor = osmd.cursor;
            cursor.show();
          }
        );
      window.addEventListener('message', (event) => {
        const action = JSON.parse(event.data);
        if (action.type === 'next') {
          cursor.next();
        } else if (action.type === 'prev') {
          cursor.previous();
        } else if (action.type === 'jump') {
          const measureNumber = action.payload;
          if (measureNumber < 1 || measureNumber > osmd.GraphicSheet.MeasureList.length) {
              debug.textContent = "Invalid measure number";
              return;
          }

          cursor.reset();
          
          while (cursor.iterator.CurrentMeasureIndex + 1 < measureNumber) {
              cursor.next();
          }
        } else if (action.type === 'show') {
          cursor.show();
        } else if (action.type === 'hide') {
          cursor.hide();
        }
      })
    </script>
  </body>
</html>

  `;

  type MessageType = "next" | "prev" | "jump" | "show" | "hide";

  return (
    <View style={styles.container}>
      <WebView
        ref={webviewRef}
        onMessage={(event) => {}}
        style={{
          flex: 3,
          justifyContent: "center",
          width: 1000,
          borderWidth: 1,
          borderColor: "#aaaaaa",
          borderRadius: 8,
        }}
        source={{ html: html }}
      />
      <Button
        title="Show"
        onPress={() =>
          webviewRef.current.postMessage(JSON.stringify({ type: "show" }))
        }
      />
      <Button
        title="Hide"
        onPress={() =>
          webviewRef.current.postMessage(JSON.stringify({ type: "hide" }))
        }
      />
      <Button
        title="Next"
        onPress={() =>
          webviewRef.current.postMessage(JSON.stringify({ type: "next" }))
        }
      />
      <Button
        title="Prev"
        onPress={() =>
          webviewRef.current.postMessage(JSON.stringify({ type: "prev" }))
        }
      />
      <Button
        title="Go to 3"
        onPress={() =>
          webviewRef.current.postMessage(
            JSON.stringify({ type: "jump", payload: 3 }),
          )
        }
      />
    </View>
  );
}
