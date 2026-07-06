import mongoose from "mongoose";

const RecruitmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    position: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
      trim: true,
    },

    experience: {
      type: Number,
      required: true,
      min: 0,
    },

    resume: {
      type: String,
      trim: true,
    },

    appliedDate: {
      type: Date,
      required: true,
    },

    interviewDate: {
      type: Date,
    },

    recruiter: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "Applied",
        "Screening",
        "Interview",
        "Offered",
        "Hired",
        "Rejected",
      ],
      default: "Applied",
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Recruitment ||
  mongoose.model("Recruitment", RecruitmentSchema);