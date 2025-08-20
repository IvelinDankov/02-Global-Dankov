import User from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./JWT_SECRET.js";

export default {
  async register(username, email, phone, password) {
    const userExist = await User.exists({ email: email });

    if (userExist) {
      throw new Error("User already exist. Please try with another!");
    }

    const user = { username, email, phone, password };

    return User.create(user);
  },

  async login(email, password) {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("Wrong user or Password. Please try again!");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      throw new Error("Wrong user or Password. Please try again!");
    }

    const payload = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    return { token, user };
  },

  updateUser(id, user) {
    return User.findByIdAndUpdate(id, user, { new: true, runValidators: true });
  },
};
