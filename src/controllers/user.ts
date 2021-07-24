import { Request, Response } from "express";
import * as admin from "firebase-admin";
import * as firebase from "firebase";
import { sign } from "jsonwebtoken";

import firebaseSettings from "../firebase.settings.json";
firebase.default.initializeApp(firebaseSettings);

class UserController {
  async register(req: Request, res: Response) {
    const { username, password, email } = req.body;

    try {
      const user = await admin.auth().createUser({
        displayName: username,
        password,
        email,
      });
      const secretKey = process.env.SECRET_KEY || "some_secret_key";
      const token = await sign(user.uid, secretKey);

      return res.json({ token, user });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { user } = await firebase.default
        .auth()
        .signInWithEmailAndPassword(email, password);
      if (!user) {
        return res.status(404).json({ error: "User not found!" });
      }

      const secretKey = process.env.SECRET_KEY || "some_secret_key";
      const token = await sign(user.uid, secretKey);

      return res.json({ token });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default UserController;
