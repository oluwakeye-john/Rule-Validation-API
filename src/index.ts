import express from "express";
import dotenv from "dotenv";
import Logger from "./logger";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const rootLogger = new Logger("root");

app.get("/", (req, res) => {
  res.send("helo");
});

app.listen(PORT, () => {
  rootLogger.log(`Server listening on ${PORT}`);
});
