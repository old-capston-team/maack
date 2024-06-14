import axios from "axios";
import FormData from "form-data";

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
          (music: any) => music.pdfFileList[0],
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

// 요청 인터셉터 설정
axios.interceptors.request.use(
  function (config) {
    // 요청을 보내기 전에 요청의 내용을 확인
    console.log("Request headers: ", config.headers);
    console.log("Request body: ", config.data);

    // 요청을 그대로 진행
    return config;
  },
  function (error) {
    // 요청 에러가 발생했을 때 처리
    return Promise.reject(error);
  },
);

export async function postMusicPDF(fileUrl: string): Promise<boolean> {
  const url = `http://${process.env.EXPO_PUBLIC_API_HOST}/api/v1/sheet-musics`;
  const form = new FormData();
  form.append("file", {
    uri: fileUrl,
    type: "application/pdf",
    name: fileUrl.split("/").pop(),
  });
  return await axios
    .postForm(url, form)
    .then(async (response) => {
      console.log(response.data);
      return response.data.isSuccess;
    })
    .catch((err) => {
      console.error(err);
    });
}
