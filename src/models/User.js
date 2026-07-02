import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true, // this will store a HASHED password, never plain text
    },
    role: {
      type: String,
      default: "admin", // only admins exist in this app, but keeping this field
                          // makes it easy to add roles later if needed
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

// Prevents Mongoose from redefining the model on every hot-reload in dev mode
export default mongoose.models.User || mongoose.model("User", UserSchema);