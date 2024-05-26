import { Text, View, Button } from "react-native";
import styles from "../styles/styles";
import Logger from "../utils/Logger";

export default function LoginPage() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 64 }}>MAACK</Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Button
          onPress={() => {
            Logger.log("Google login button pressed");
          }}
          title="Google 계정으로 로그인"
        />
      </View>
    </View>
  );
}
