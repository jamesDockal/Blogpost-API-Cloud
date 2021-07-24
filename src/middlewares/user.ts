import { Request, Response, NextFunction } from "express";

class UserMiddleware {
  passedCrendentials(req: Request, res: Response, next: NextFunction) {
    const { username, password, email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "No email provided!" });
    }

    if (!username) {
      return res.status(400).json({ error: "No username provided!" });
    }
    if (!password) {
      return res.status(400).json({ error: "No password provided!" });
    }
    return next();
  }
}

export default UserMiddleware;
