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

  async deletePost(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const postRef = await admin.database().ref(`/posts/${id}`);
      const post = await (await postRef.get()).exists();

      if (!post) {
        return res.status(404).json({ error: "Post not Found" });
      }
      await postRef.remove();
      return res.json({ success: "Post deleted!" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default PostController;
