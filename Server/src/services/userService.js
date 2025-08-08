import User from "../models/userModel.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET =
  "9e8e1104a534f5a86e7679c5c53e157c5a410e8248535c05a67be09c4f2e1335";

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
      throw new Error("User does not exist!");
    }

    const isValid = bcrypt.compare(password, user.password);

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
