import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const salt = 10;

const userSchema = new Schema({
  username: { type: String },
  email: { type: String },
  password: { type: String },
});

userSchema.pre("save", async function () {
  return (this.password = await bcrypt.hash(this.password, salt));
});

const User = model("User", userSchema);

export default User;
