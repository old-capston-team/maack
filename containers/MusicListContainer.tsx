import { useEffect, useState } from "react";
import { SheetMusic, getMyMusic, postMusicPDF } from "../services/musicService";
import { View, Text, StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Toast from "react-native-root-toast";
import MusicCard from "../components/MusicCard";
import LoadingCard from "../components/LoadingCard";
import IconCard from "../components/IconCard";

const thumbnailURL = `http://${process.env.EXPO_PUBLIC_CDN_HOST}/assets/pdf_thumbnail_1.jpg`;

export default function MusicListContainer() {
  const [musicList, setMusicList] = useState<SheetMusic[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    reloadMusicList();
  }, []);

  const reloadMusicList = () => {
    getMyMusic().then((musicList) => {
      if (musicList) {
        setMusicList(musicList);
      } else {
        console.error("Failed to load music list");
      }
    });
  };

  const uploadPDF = async () => {
    const res = await DocumentPicker.getDocumentAsync({
      type: ["application/pdf"],
    });
    if (res.canceled) {
      Toast.show("악보 등록을 취소했습니다.", {
        duration: Toast.durations.SHORT,
      });
      return;
    }
    setIsUploading(true);
    const result = await postMusicPDF(res.assets[0].uri);
    setIsUploading(false);
    if (result) {
      Toast.show("악보가 변환되었습니다!", {
        duration: Toast.durations.SHORT,
      });

      reloadMusicList();
    }
  };

  return (
    <View>
      <Text>Widget Test Page</Text>
      <View style={styles.container}>
        {musicList.map((item, id) => (
          <MusicCard
            key={id}
            thumbnail={thumbnailURL}
            title={item.fileName}
            onPress={() => {
              console.log("press " + item);
            }}
          />
        ))}
        {isUploading && <LoadingCard title="악보를 생성중..." />}
        <IconCard
          icon="pluscircleo"
          title="악보 추가"
          onPress={() => {
            uploadPDF();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    flexWrap: "wrap",
  },
});
