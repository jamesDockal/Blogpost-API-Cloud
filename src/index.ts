import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import express from "express";

import firebaseAccountCredentials from "./key.json";
import dotenv from "dotenv";
dotenv.config();

import blogpostRouter from "./routes/blopost";
import userRouter from "./routes/user";

const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASEURL,
});

const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/post", blogpostRouter);

exports.api = functions.https.onRequest(app);
