import { useEffect, useState } from "react";
import axios from "axios";
import { encryptStudentFields } from "../utils/crypto";

export type StudentData = {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  courseEnrolled: string;
  password: string;
};

type Props = {
  selectedStudent: any;
  clearSelectedStudent: () => void;
  refreshStudents: () => void;
};

const initialState: StudentData = {
  fullName: "",
  email: "",
  phoneNumber: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  courseEnrolled: "",
  password: "",
};

const API_URL = "http://localhost:5000/api";

const StudentForm = ({
  selectedStudent,
  clearSelectedStudent,
  refreshStudents,
}: Props) => {
  const [formData, setFormData] = useState<StudentData>(initialState);

  useEffect(() => {
    if (selectedStudent) {
      setFormData(selectedStudent);
    }
  }, [selectedStudent]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.email || !formData.password) {
      alert("Full Name, Email and Password are required");
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      alert("Invalid email");
      return false;
    }

    if (formData.password.length < 6) {
      alert("Password must be at least 6 characters");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;
const encryptedData = encryptStudentFields(formData);
    

    try {
      if (selectedStudent?._id) {
     await axios.put(`${API_URL}/student/${selectedStudent._id}`, encryptedData);

        alert("Student updated successfully");
      } else {
      await axios.post(`${API_URL}/register`, encryptedData);

        alert("Student registered successfully");
      }

      setFormData(initialState);
      clearSelectedStudent();
      refreshStudents();
    } catch (error: any) {
  alert(error.response?.data?.message || "Something went wrong");
  console.error(error);
}
  };

  return (
    <div className="student-form-container">
      <div className="student-form-card">
        <div className="student-form-header">
          <h2>
            {selectedStudent
              ? "Update Student Profile"
              : "Student Registration"}
          </h2>

          <p>Secure encrypted student management system</p>
        </div>

        <form onSubmit={handleSubmit} className="modern-form-grid">
          <div className="modern-input-group">
            <label>Full Name</label>
            <input
              name="fullName"
              placeholder="Enter full name"
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="modern-input-group">
            <label>Email Address</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="modern-input-group">
            <label>Phone Number</label>
            <input
              name="phoneNumber"
              placeholder="Enter phone number"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
          </div>

          <div className="modern-input-group">
            <label>Date of Birth</label>
            <input
              name="dateOfBirth"
              type="date"
              value={formData.dateOfBirth}
              onChange={handleChange}
            />
          </div>

          <div className="modern-input-group">
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="modern-input-group">
            <label>Course Enrolled</label>
            <input
              name="courseEnrolled"
              placeholder="Enter course"
              value={formData.courseEnrolled}
              onChange={handleChange}
            />
          </div>

          <div className="modern-input-group full-width">
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="modern-input-group full-width">
            <label>Address</label>

            <textarea
              name="address"
              placeholder="Enter address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="button-group">
            <button type="submit" className="modern-submit-btn">
              {selectedStudent ? "Update Student" : "Register Student"}
            </button>

            {selectedStudent && (
              <button
                type="button"
                className="modern-cancel-btn"
                onClick={clearSelectedStudent}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudentForm;