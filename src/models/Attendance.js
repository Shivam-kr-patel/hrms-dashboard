import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    status: {
      type: String,
      enum: ["Present", "Absent", "Leave"],
      default: "Present",
    },

    checkIn: {
      type: String,
    },

    checkOut: {
      type: String,
    },

    remarks: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", AttendanceSchema);