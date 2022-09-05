"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.application = (0, express_1.default)();
    }
}
const app = new App().application;
app.set("view engine", "pug");
app.set("views", __dirname + "/views");
// app.use("/public", express.static(__dirname + "../dist/src/public/ts/app.js"));
app.use("/public", express_1.default.static(__dirname + "/../dist/src/public"));
app.get("/", (req, res) => res.render("home"));
app.listen(3000, () => {
    console.log(`
  ################################################
  🚀  Server listening on port: 3000🚀
  ################################################
`);
});
