import express from "express";
import router from "./routes.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
const PORT = 3000;

app.use(cors());
main().catch((err) => console.error(err));
async function main() {
  await mongoose.connect("mongodb://localhost:27017", {
    dbName: "dankov-global",
  });
  console.log("Connected to MongoDB... 👌");
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}...👌`)
);
