import express, { Request, Response } from "express";
import http from "http";
import WebSocket from "ws";
class App {
  public application: express.Application;

  constructor() {
    this.application = express();
  }
}

interface Message {
  type: string;
  payload: string;
}

interface NoomWebSocket {
  nickname: string;
}

const app = new App().application;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/../dist/src/public"));
app.get("/", (_: Request, res: Response) => res.render("home"));
app.get("/*", (_: Request, res: Response) => res.redirect("/"));

const handleListen = () => {
  console.log(`
  ################################################
  🚀  Server listening on port: 3000🚀
  ################################################
`);
};

const server = http.createServer(app);

const sockets: Array<WebSocket & NoomWebSocket> = [];

const wss = new WebSocket.Server({ server });

wss.on("connection", (socket: WebSocket & NoomWebSocket) => {
  sockets.push(socket);
  console.log("Connected to Browser ✅");

  socket["nickname"] = "Anonymous";

  socket.on("close", () => console.log("Disconnected from Browser ❌"));

  socket.on("message", (message: string) => {
    const parsedMessage: Message = JSON.parse(message);

    if (parsedMessage.type === "message") {
      sockets.forEach((s) => {
        s.send(`${socket.nickname} : ${parsedMessage.payload}`);
      });
    } else if (parsedMessage.type === "nickname") {
      socket["nickname"] = parsedMessage.payload;
    }
  });

  socket.send("hello!");
});

server.listen(3000, handleListen);
