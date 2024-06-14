import { Text, View, Button } from "react-native";
import styles from "../styles/styles";
import Logger from "../utils/Logger";
import * as DocumentPicker from "expo-document-picker";
import { postMusicPDF } from "../services/musicService";
import FormData from "form-data";

export default function DocumentPage() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 64 }}>Document</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          onPress={async () => {
            Logger.log("Upload PDF button pressed");
            const res = await DocumentPicker.getDocumentAsync({
              type: ["application/pdf"],
            });
            console.log("upload started");
            postMusicPDF(res.assets[0].uri).then((success) => {
              console.log(success ? "upload success" : "upload failed");
            });
          }}
          title="Upload PDF"
        />
      </View>
    </View>
  );
}
