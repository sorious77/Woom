import express, { Request, Response, Application } from "express";
import http from "http";
import WebSocket from "ws";
class App {
  public application: express.Application;

  constructor() {
    this.application = express();
  }
}

const app = new App().application;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/../dist/src/public"));
app.get("/", (req: Request, res: Response) => res.render("home"));

const handleListen = () => {
  console.log(`
  ################################################
  🚀  Server listening on port: 3000🚀
  ################################################
`);
};

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

server.listen(3000, handleListen);
