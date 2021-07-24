import { Request, Response } from "express";
import * as admin from "firebase-admin";

class PostController {
  async getAllPosts(req: Request, res: Response) {
    const posts = await admin.database().ref("/posts").get();

    return res.json({ posts });
  }

  async createPost(req: Request, res: Response) {
    const { content, title } = req.body;
    const { jwt_user_id } = res.locals;

    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    const postRef = await admin.database().ref("/posts");
    const post = await postRef
      .push({
        content,
        title,
        slug,
        created_by: jwt_user_id,
      })
      .get()
      .catch((err) => {
        return res.status(400).json({ error: err.message });
      });
    return res.json({ post });

    res.send(jwt_user_id);
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

  async updatePost(req: Request, res: Response) {
    const { id } = req.params;

    try {
      const postRef = await admin.database().ref(`/posts/${id}`);
      const post = await (await postRef.get()).exists();

      if (!post) {
        return res.status(404).json({ error: "Post not Found" });
      }

      const { title, content } = req.body;
      if (!title && !content) {
        return res
          .status(400)
          .json({ error: "You must provide a new title or content" });
      }

      if (title && content) {
        const slug = title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");
        await postRef.update({
          title,
          content,
          slug,
        });
        const updatedPost = await postRef.get();

        return res.json({ updatedPost });
      }

      if (title) {
        const slug = title
          .toLowerCase()
          .replace(/ /g, "-")
          .replace(/[^\w-]+/g, "");
        await postRef.update({
          title,
          slug,
        });
        const updatedPost = await postRef.get();

        return res.json({ updatedPost });
      }

      if (content) {
        await postRef.update({
          content,
        });
        const updatedPost = await postRef.get();

        return res.json({ updatedPost });
      }
      return res.status(500).json({ error: "Internal error" });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export default PostController;
