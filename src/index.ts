import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("helo");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
