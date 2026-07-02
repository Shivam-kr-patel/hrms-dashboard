// scripts/seedAdmin.js
require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const MONGODB_URI = process.env.MONGODB_URI;

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, default: "admin" },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);

  const existing = await User.findOne({ email: "admin@hrms.com" });
  if (existing) {
    console.log("Admin already exists. Skipping.");
    process.exit(0);
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Admin",
    email: "admin@hrms.com",
    password: hashedPassword,
    role: "admin",
  });

  console.log("Admin user created successfully!");
  console.log("Email: admin@hrms.com");
  console.log("Password: admin123");
  process.exit(0);
}

seed();