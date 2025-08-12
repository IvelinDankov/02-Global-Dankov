import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const salt = 10;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minLength: [5, "Username must be at least 5 charachters long"],
  },
  email: {
    type: String,
    required: [true, "Email is required!"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minLength: [6, "Password must be at least 6 charachters long!"],
  },
});

userSchema.pre("save", async function () {
  return (this.password = await bcrypt.hash(this.password, salt));
});

const User = model("User", userSchema);

export default User;
