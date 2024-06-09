const express = require("express");
const app = express();
const expressWs = require("express-ws")(app);
const port = 3000;

app.ws("/echo", (ws, req) => {
  ws.on("message", (msg) => {
    ws.send(msg);
  });
});

app.listen(port, () => {
  console.log("Server is running on port " + port);
});
