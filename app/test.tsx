import { Text, View, Button } from "react-native";
import styles from "../styles/styles";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import WebView from "react-native-webview";

export default function TestPage() {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [uri, setUri] = useState();
  const [sound, setSound] = useState();
  const [color, setColor] = useState(0);

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
      if (permissionResponse.status !== "granded") {
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
    <script src="https://github.com/opensheetmusicdisplay/opensheetmusicdisplay/releases/download/1.8.8/opensheetmusicdisplay.min.js"></script>
    <script>
      var osmd = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdContainer");
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
          }
        );
    </script>
  </body>
</html>

  `;

  return (
    <View style={styles.container}>
      <WebView
        ref={(r) => (this.webref = r)}
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
        injectedJavaScript={`
          window.addEventListener('message', (event) => {
            const data = JSON.parse(event.data);
            const header = document.getElementById("myHeader");
            header.style.color = data.color;
          })
        `}
      />
    </View>
  );
}
