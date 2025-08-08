import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const token = req.cookies["auth"];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decodedToken = jwt.verify(token);

    req.user = decodedToken;
    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
