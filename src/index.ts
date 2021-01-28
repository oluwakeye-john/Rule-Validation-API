import express from "express";
import dotenv from "dotenv";
import Logger from "./logger";
import { STATUS_CODE } from "./@types/general";
import handleErrors from "./middlewares/error.middleware";
import { BadRequestException } from "./error";
import router from "./router";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const rootLogger = new Logger("root");

app.use(router);
app.use(handleErrors);

app.listen(PORT, () => {
  rootLogger.log(`Server listening on ${PORT}`);
});
