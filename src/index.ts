import dotenv from "dotenv";
import express from "express";
import Logger from "./logger";
import handleErrors from "./middlewares/error.middleware";
import router from "./router";
import bodyParser from "body-parser";
import { BadRequestException } from "./error";

dotenv.config();
const app = express();

const PORT = process.env.PORT;
const rootLogger = new Logger("root");

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  bodyParser.json()(req, res, (err) => {
    if (err) {
      next(new BadRequestException("Invalid JSON payload passed.", null));
    } else {
      next();
    }
  });
});

app.use(router);
app.use(handleErrors);

app.listen(PORT, () => {
  rootLogger.log(`Server listening on ${PORT}`);
});
