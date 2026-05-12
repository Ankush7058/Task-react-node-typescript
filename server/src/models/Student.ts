import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    encryptedData: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Student", studentSchema);