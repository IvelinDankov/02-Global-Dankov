import { Router } from "express";
import userService from "../services/userService.js";

const userController = Router();

userController.post("/register", async (req, res) => {
  const { username, email, password, rePassword } = req.body;

  try {
    if (password !== rePassword) {
      throw new Error("Password Mismatch!");
    }

    const user = await userService.register(username, email, password);

    const token = await userService.login(email, password);

    res.cookie("auth", token, { httpOnly: true });

    res
      .status(200)
      .json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: "Error fetching User", error: err });
  }
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { token, user } = await userService.login(email, password);

    res.cookie("auth", token, { httpOnly: true });

    res
      .status(200)
      .json({ token, user: { username: user.username, email: user.email } });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

userController.post("/logout", (req, res) => {
  res.clearCookie("auth").status(200).json({ message: "Logged out" });
});

export default userController;
