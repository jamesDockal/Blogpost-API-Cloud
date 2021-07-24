import { Router } from "express";
import PostController from "../controllers/post";
import isLogged from "../middlewares/isLogged";
import PostMiddleware from "../middlewares/post";

const postRouter = Router();

const { getAllPosts, createPost } = new PostController();

const { passedCrendentials } = new PostMiddleware();

postRouter.get("/", getAllPosts);

postRouter.post("/create", isLogged, passedCrendentials, createPost);

export default postRouter;
