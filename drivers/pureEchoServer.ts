const net = require("net");

const server = net.createServer((socket) => {
  console.log("클라이언트 연결됨");

  socket.on("data", (data) => {
    console.log("클라이언트로부터 데이터 수신\n", data.toString());
    socket.write(data); // 클라이언트로부터 받은 데이터를 다시 보냄
  });

  socket.on("end", () => {
    console.log("클라이언트 연결 종료");
  });

  socket.on("error", (err) => {
    console.error("소켓 오류:", err);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`서버가 포트 ${PORT}에서 시작됨`);
});
