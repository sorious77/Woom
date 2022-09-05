import express, { Request, Response, Application } from "express";

class App {
  public application: express.Application;

  constructor() {
    this.application = express();
  }
}

const app = new App().application;

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
// app.use("/public", express.static(__dirname + "../dist/src/public/ts/app.js"));
app.use("/public", express.static(__dirname + "/../dist/src/public"));
app.get("/", (req: Request, res: Response) => res.render("home"));

app.listen(3000, () => {
  console.log(`
  ################################################
  🚀  Server listening on port: 3000🚀
  ################################################
`);
});
