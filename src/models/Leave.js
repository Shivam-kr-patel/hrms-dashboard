import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId, // reference, not a copy of employee data
      ref: "Employee",                       // tells Mongoose this ID points to the Employee model
      required: true,
    },
    leaveType: {
      type: String,
      enum: ["Sick Leave", "Casual Leave", "Paid Leave", "Unpaid Leave"],
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Leave || mongoose.model("Leave", LeaveSchema);