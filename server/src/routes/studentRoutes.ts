import express from "express";
import {
  registerStudent,
  getStudents,
  updateStudent,
  deleteStudent,
  loginStudent,
} from "../controllers/studentController";

const router = express.Router();

router.post("/login", loginStudent);
router.post("/register", registerStudent);
router.get("/students", getStudents);
router.put("/student/:id", updateStudent);
router.delete("/student/:id", deleteStudent);

export default router;