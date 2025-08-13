import { Router } from "express";
import userService from "../services/userService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import errorMsg from "../utils/errorMsg.js";

const userController = Router();

userController.post("/register", isAuth, async (req, res) => {
  const { username, email, password, rePassword } = req.body;

  try {
    if (password !== rePassword) {
      throw new Error("Password Mismatch!");
    }

    await userService.register(username, email, password);

    const { token, user } = await userService.login(email, password);

    res.cookie("auth", token, { httpOnly: true, sameSite: "lax" });

    res.status(200).json({
      token,
      user: {
        _id: String(user._id),
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    const error = await errorMsg(err);
    res.status(500).json({ message: error, error: error });
  }
});

userController.post("/login", isAuth, async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await userService.login(email, password);

    res.cookie("auth", token, { httpOnly: true, sameSite: "lax" });

    res.status(200).json({
      token,
      user: {
        _id: String(user._id),
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    const error = await errorMsg(err);
    res.status(500).json({ message: error, error: error });
  }
});

userController.post("/logout", isAuth, (req, res) => {
  res.clearCookie("auth").status(200).json({ message: "Logged out" });
});

export default userController;
