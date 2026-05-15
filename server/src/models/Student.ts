import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String },
    dateOfBirth: { type: String },
    gender: { type: String },
    address: { type: String },
    courseEnrolled: { type: String },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);