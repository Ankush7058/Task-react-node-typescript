import { Request, Response } from "express";
import Student from "../models/Student";
import { encryptBackend, decryptBackend } from "../utils/crypto";

export const registerStudent = async (req: Request, res: Response) => {
  try {
    const { encryptedData } = req.body;

    if (!encryptedData) {
      return res.status(400).json({ message: "Encrypted data is required" });
    }

    const doubleEncryptedData = encryptBackend(encryptedData);

    const student = await Student.create({
      encryptedData: doubleEncryptedData,
    });

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

    const decryptedOneLevel = students.map((student) => ({
      _id: student._id,
      encryptedData: decryptBackend(student.encryptedData),
      createdAt: student.createdAt,
      updatedAt: student.updatedAt,
    }));

    res.status(200).json(decryptedOneLevel);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students", error });
  }
};

export const updateStudent = async (req: Request, res: Response) => {
  try {
    const { encryptedData } = req.body;

    if (!encryptedData) {
      return res.status(400).json({ message: "Encrypted data is required" });
    }

    const doubleEncryptedData = encryptBackend(encryptedData);

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { encryptedData: doubleEncryptedData },
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