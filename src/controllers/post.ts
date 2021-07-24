import { Request, Response } from "express";
import * as admin from "firebase-admin";

class PostController {
  async getAllPosts(req: Request, res: Response) {
    const posts = await admin.database().ref("/posts").get();

    return res.json({ posts });
  }

  async createPost(req: Request, res: Response) {
    const { content, title } = req.body;

    const postRef = await admin.database().ref("/posts");
    const post = await postRef
      .push({
        content,
        title,
      })
      .get()
      .catch((err) => {
        return res.status(400).json({ error: err.message });
      });
    return res.json({ post });
  }
}

export default PostController;
