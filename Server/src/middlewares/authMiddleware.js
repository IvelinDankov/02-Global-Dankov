import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../services/JWT_SECRET.js";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies["auth"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized, Login first!" });
  }

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized, Login first!" });
  }
};

export function isGuest(req, res, next) {
  if (!req.user) {
    return res.redirect("/login");
  }

  next();
}

export function isAuth(req, res, next) {
  if (req.user) {
    return res.redirect("/");
  }

  next();
}
