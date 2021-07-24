import { Router } from "express";
import PostController from "../controllers/post";
import isLogged from "../middlewares/isLogged";
import PostMiddleware from "../middlewares/post";

const postRouter = Router();

const { getAllPosts, createPost, deletePost, updatePost } =
  new PostController();

const { providedInfo } = new PostMiddleware();

postRouter.get("/", getAllPosts);

postRouter.post("/create", isLogged, providedInfo, createPost);
postRouter.delete("/:id", isLogged, deletePost);
postRouter.put("/:id", isLogged, updatePost);

export default postRouter;
