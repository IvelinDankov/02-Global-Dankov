import { Router } from "express";
import userService from "../services/userService.js";

const userController = Router();

userController.post("/register", async (req, res) => {
  const { username, email, password, rePassword } = req.body;

  if (password !== rePassword) {
    throw new Error("Password Mismach!");
  }

  try {
    const user = await userService.register(username, email, password);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err });
  }
});

export default userController;
