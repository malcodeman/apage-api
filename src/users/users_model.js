import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  pages: {
    type: Array
  }
});
const User = mongoose.model("User", UserSchema);

export default User;
