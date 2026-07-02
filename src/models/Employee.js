import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    department: {
      type: String,
      required: true,
    },

    designation: {
      type: String,
      required: true,
    },

    joiningDate: {
      type: Date,
      required: true,
    },

    salary: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Inactive", "On Leave"],
      default: "Active",
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Employee ||
  mongoose.model("Employee", EmployeeSchema);
