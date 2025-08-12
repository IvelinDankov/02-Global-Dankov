import User from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./JWT_SECRET.js";

export default {
  async register(username, email, password) {
    const userExist = await User.exists({ email: email });

    if (userExist) {
      throw new Error("User Already Exist.");
    }

    const user = { username, email, password };

    return User.create(user);
  },

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      return "User does not exist!";
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Password is not valid!");
    }

    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return { token, user };
  },
};
