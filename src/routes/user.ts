import { Router } from "express";
import * as admin from "firebase-admin";
import UserController from "../controllers/user";
import UserMiddleware from "../middlewares/user";

const userRouter = Router();

const { passedCrendentials } = new UserMiddleware();
const { login, register } = new UserController();

userRouter.get("/", async (req, res) => {
  const users = await admin.auth().listUsers();

  return res.send(users);
});

userRouter.post("/login", passedCrendentials, login);

userRouter.post("/register", passedCrendentials, register);

export default userRouter;
