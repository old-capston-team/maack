const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const port = 3000;

app.ws("/echo", (ws, req) => {
  ws.on("message", (msg) => {
    ws.send(msg);
  });
});

app.ws("/tracking_progress", (ws, req) => {
  let initialized = false;
  let index = 300;
  ws.on("message", (msg) => {
    console.log("got message: " + msg);
    if (!initialized) {
      initialized = true;
      ws.send(JSON.stringify({ isStarted: true }));
    } else {
      ws.send(
        JSON.stringify({
          best_start: index,
          best_end: index + 8,
          isFinished: index > 356,
        }),
      );
      index += 8;
    }
  });
});

app.get("/api/v1/sheet-musics/me", (req, res) => {
  res.send({
    isSuccess: true,
    code: "1000",
    message: "요청에 성공하였습니다.",
    result: {
      mySheetMusicList: [
        {
          sheetMusicId: 1,
          pdfFileList: [
            {
              pdfFileId: 1,
              fileName: "ocarina.pdf",
              fileSize: 1024,
              url: "https://example.com/ocarina.pdf",
            },
          ],
        },
        {
          sheetMusicId: 2,
          pdfFileList: [
            {
              pdfFileId: 2,
              fileName: "ocarina.pdf",
              fileSize: 1024,
              url: "https://example.com/ocarina.pdf",
            },
          ],
        },
        {
          sheetMusicId: 3,
          pdfFileList: [
            {
              pdfFileId: 3,
              fileName: "ocarina.pdf",
              fileSize: 1024,
              url: "https://example.com/ocarina.pdf",
            },
          ],
        },
      ],
    },
  });
});

app.post("/api/v1/sheet-musics", (req, res) => {
  setTimeout(() => {
    res.send({ isSuccess: true });
  }, 10000);
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
