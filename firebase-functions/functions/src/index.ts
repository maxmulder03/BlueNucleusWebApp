import express from "express";
import { initializeApp } from "firebase-admin/app";
import cors from "cors";
import helmet from "helmet";
import { onRequest } from "firebase-functions/v2/https";

import userInfo from "./userInfo";

initializeApp();

const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

// Define routes here
app.use("/userInfo", userInfo);

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

exports.api = onRequest(app);
