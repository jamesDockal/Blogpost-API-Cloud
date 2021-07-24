import { Router } from "express";
import BlogpostController from "../controllers/post";

const blogpostRouter = Router();

const { getAllPosts } = new BlogpostController();

blogpostRouter.get("/", getAllPosts);

export default blogpostRouter;
