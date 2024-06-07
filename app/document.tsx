import { Text, View, Button } from "react-native";
import styles from "../styles/styles";
import Logger from "../utils/Logger";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";

export default function DocumentPage() {
  const readFile = async (uri: string) => {
    try {
      const content = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      Uint8Array;
      return content;
    } catch (error) {
      console.error("Error reading file: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 64 }}>Document</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          onPress={() => {
            Logger.log("Upload PDF button pressed");
            DocumentPicker.getDocumentAsync().then((result) => {
              readFile(result.assets[0].uri).then((content) => {
                Logger.log(content.substring(0, 100) + "...");
              });
            });
          }}
          title="Upload PDF"
        />
      </View>
    </View>
  );
}
