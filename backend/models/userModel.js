import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
      minlength: [2, "Name must be longer than two characters"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: [true],
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
      minlength: [8, "Password must be at least 8 characters long "],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (passwordInput) {
  return await bcrypt.compare(passwordInput, this.password);
};
const User = mongoose.model("User", userSchema);

export default User;
