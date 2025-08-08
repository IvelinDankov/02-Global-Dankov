import express from "express";
import router from "./routes.js";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/authMiddleware.js";

const app = express();
const PORT = 3000;

app.use(
  cors({
    origin: "http://localhost:4200",
    credentials: true,
  })
);
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
// app.use(authMiddleware);

app.use(router);

app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}...👌`)
);
