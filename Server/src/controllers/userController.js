import { Router } from "express";
import userService from "../services/userService.js";
import errorMsg from "../utils/errorMsg.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

const userController = Router();

userController.post("/register", isGuest, async (req, res) => {
  const { username, email, phone, password, rePassword } = req.body;

  try {
    if (password !== rePassword) {
      throw new Error("Password Mismatch!");
    }

    await userService.register(username, email, phone, password);

    const { token, user } = await userService.login(email, password);

    res.cookie("auth", token, { httpOnly: true, sameSite: "lax" });

    res.status(200).json({
      token,
      user: {
        _id: String(user._id),
        username: user.username,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    const error = await errorMsg(err);
    res.status(500).json({ message: error, error: error });
  }
});

userController.post("/login", isGuest, async (req, res) => {
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
        phone: user.phone,
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

userController.put("/update", async (req, res) => {
  const userId = req.body._id;
  const { username, imageUrl, email, phone } = req.body;

  try {
    const updatedUser = await userService.updateUser(userId, {
      username,
      imageUrl,
      email,
      phone,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      _id: String(updatedUser._id),
      imageUrl: updatedUser.imageUrl,
      username: updatedUser.username,
      email: updatedUser.email,
      phone: updatedUser.phone,
    });
  } catch (err) {
    const error = await errorMsg(err);
    res.status(500).json({ message: error });
  }
});

export default userController;
