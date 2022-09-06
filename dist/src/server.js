"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = __importDefault(require("ws"));
class App {
    constructor() {
        this.application = (0, express_1.default)();
    }
}
const app = new App().application;
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express_1.default.static(__dirname + "/../dist/src/public"));
app.get("/", (_, res) => res.render("home"));
app.get("/*", (_, res) => res.redirect("/"));
const handleListen = () => {
    console.log(`
  ################################################
  🚀  Server listening on port: 3000🚀
  ################################################
`);
};
const handleConnection = (socket) => {
    console.log(socket);
};
const server = http_1.default.createServer(app);
const wss = new ws_1.default.Server({ server });
wss.on("connection", handleConnection);
server.listen(3000, handleListen);
