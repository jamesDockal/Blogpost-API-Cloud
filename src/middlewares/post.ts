import { NextFunction, Request, Response } from "express";

class PostMiddleware {
  providedInfo(req: Request, res: Response, next: NextFunction) {
    const { title, content } = req.body;

    if (!title) {
      return res.status(400).json({ error: "You need to provide a title!" });
    }
    if (!content) {
      return res.status(400).json({ error: "You need to provide a content!" });
    }

    return next();
  }

  providedParam(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    if (!id) {
      return res
        .status(400)
        .json({ error: "You need to provide an id param to delete a post" });
    }
    return next();
  }
}

export default PostMiddleware;
