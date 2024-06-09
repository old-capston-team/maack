import { Audio } from "expo-av";
import { useRef } from "react";
import * as FileSystem from "expo-file-system";

export default function useRecording(
  onRecordingChange: (recording: string) => void,
  onError?: (error: Error) => void,
) {
  const recordingRef = useRef<Audio.Recording>();

  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const startRecording = async () => {
    try {
      if (permissionResponse.status !== "granted") {
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY,
      );
      recordingRef.current = recording;
    } catch (err) {
      if (onError) onError(err);
    }
  };

  const stopRecording = async () => {
    await recordingRef.current.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });

    const uri = recordingRef.current.getURI();
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    recordingRef.current = undefined;
    onRecordingChange(base64);
  };

  return [startRecording, stopRecording];
}
