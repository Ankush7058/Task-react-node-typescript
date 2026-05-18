import { Request, Response } from "express";
import Student from "../models/Student";
import { encryptBackend, decryptBackend, decryptFrontendOnBackend } from "../utils/crypto";

const decryptStudentOneLevel = (student: any) => ({
  _id: student._id,
  fullName: decryptBackend(student.fullName),
  email: decryptBackend(student.email),
  phoneNumber: decryptBackend(student.phoneNumber || ""),
  dateOfBirth: decryptBackend(student.dateOfBirth || ""),
  gender: decryptBackend(student.gender || ""),
  address: decryptBackend(student.address || ""),
  courseEnrolled: decryptBackend(student.courseEnrolled || ""),
  password: decryptBackend(student.password),
  createdAt: student.createdAt,
  updatedAt: student.updatedAt,
});

const encryptStudentFieldsBackend = (data: any) => ({
  fullName: encryptBackend(data.fullName),
  email: encryptBackend(data.email),
  phoneNumber: encryptBackend(data.phoneNumber || ""),
  dateOfBirth: encryptBackend(data.dateOfBirth || ""),
  gender: encryptBackend(data.gender || ""),
  address: encryptBackend(data.address || ""),
  courseEnrolled: encryptBackend(data.courseEnrolled || ""),
  password: encryptBackend(data.password),
});

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      courseEnrolled,
      password,
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Full name, email and password are required",
      });
    }

// Prevent duplicate email registration
const existingStudents = await Student.find();

const incomingOriginalEmail = decryptFrontendOnBackend(email)
  .trim()
  .toLowerCase();

for (const student of existingStudents) {
  const frontendEncryptedEmail = decryptBackend(student.email);

  const existingOriginalEmail = decryptFrontendOnBackend(frontendEncryptedEmail)
    .trim()
    .toLowerCase();

  if (existingOriginalEmail === incomingOriginalEmail) {
    return res.status(400).json({
      message: "Email already registered",
    });
  }
}

    const encryptedStudent = encryptStudentFieldsBackend({
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      courseEnrolled,
      password,
    });

    const student = await Student.create(encryptedStudent);

    res.status(201).json({
      message: "Student registered successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed", error });
  }
};

export const getStudents = async (_req: Request, res: Response) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });

    const decryptedOneLevel = students.map((student) =>
      decryptStudentOneLevel(student)
    );

    res.status(200).json(decryptedOneLevel);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const {
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      courseEnrolled,
      password,
    } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({
        message: "Full name, email and password are required",
      });
    }

    const encryptedStudent = encryptStudentFieldsBackend({
      fullName,
      email,
      phoneNumber,
      dateOfBirth,
      gender,
      address,
      courseEnrolled,
      password,
    });

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      encryptedStudent,
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      message: "Student updated successfully",
      student,
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error });
  }
};

export const loginStudent = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Default demo login
    if (email === "admin@test.com" && password === "admin123") {
      return res.status(200).json({
        message: "Default demo login successful",
        user: {
          email: "admin@test.com",
          role: "Demo Admin",
        },
      });
    }

    const students = await Student.find();

    for (const student of students) {
      const frontendEncryptedEmail = decryptBackend(student.email);
      const frontendEncryptedPassword = decryptBackend(student.password);

      const originalEmail = decryptFrontendOnBackend(frontendEncryptedEmail);
      const originalPassword = decryptFrontendOnBackend(frontendEncryptedPassword);

      if (originalEmail === email && originalPassword === password) {
        return res.status(200).json({
          message: "Login successful",
          user: {
            id: student._id,
            email: originalEmail,
            role: "Student",
          },
        });
      }
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (error) {
    res.status(500).json({ message: "Login failed", error });
  }
};