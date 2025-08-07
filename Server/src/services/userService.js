import User from "../models/userModel.js";

export default {
  register(username, email, password) {
    const user = { username, email, password };

    return User.create(user);
  },
};
