import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      minlength: [2, 'Name must be longer than two characters'],
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: [true, "Please add an email"],
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [8, "Password must be at least 8 characters long "]
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
