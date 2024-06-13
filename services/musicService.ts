import axios from "axios";

type SheetMusic = {
  pdfFileId: number;
  fileName: string;
  url: string;
  fileSize: number;
};

export async function getMyMusic(): Promise<Array<SheetMusic>> {
  return await axios
    .get(`http://${process.env.EXPO_PUBLIC_API_HOST}/api/v1/sheet-musics/me`, {
      params: {
        memberId: 1,
        page: 1,
      },
    })
    .then((response) => {
      const data = response.data;
      if (data.isSuccess) {
        return data.result.mySheetMusicList.map(
          (music) => music.pdfFileList[0],
        );
      } else {
        throw new Error(data.message);
      }
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}

export async function getMusicXMLUrl(id: number): Promise<string> {
  return await axios
    .get(`http://${process.env.EXPO_PUBLIC_API_HOST}/api/v1/sheet-music/${id}`)
    .then((response) => {
      const data = response.data;
      if (data.isSuccess) {
        return data.result.musicXmlFileUrl;
      } else {
        throw new Error(data.message);
      }
    })
    .catch((err) => {
      console.error(err);
      return null;
    });
}
