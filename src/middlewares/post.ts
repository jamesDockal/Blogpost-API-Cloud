import { NextFunction, Request, Response } from "express";

class PostMiddleware {
  passedCrendentials(req: Request, res: Response, next: NextFunction) {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ error: "You need to provide a title!" });
    }
    if (!content) {
      return res.status(400).json({ error: "You need to provide a content!" });
    }

    return next();
  }
}

export default PostMiddleware;
