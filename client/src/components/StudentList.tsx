import axios from "axios";
import { decryptStudentFields } from "../utils/crypto";

const API_URL = "http://localhost:5000/api";

type Props = {
  students: any[];
  setStudents: React.Dispatch<React.SetStateAction<any[]>>;
  onEdit: (student: any) => void;
};

const StudentList = ({ students, setStudents, onEdit }: Props) => {
 const deleteStudent = async (id: string, email: string) => {
  if (!confirm("Delete this student?")) return;

  try {
    await axios.delete(`${API_URL}/student/${id}`);

    setStudents(students.filter((student) => student._id !== id));

    // Logout immediately if deleted account is currently logged in
    const loggedInEmail = localStorage.getItem("loggedInEmail");

if (loggedInEmail === email.trim().toLowerCase()) {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("loggedInEmail");

      alert("Your account has been deleted. Logging out...");

      window.location.reload();

      return;
    }

    alert("Student deleted successfully");
  } catch (error) {
    alert("Delete failed");
    console.error(error);
  }
};
  const decryptedStudents = students
    .map((student) => {
      try {
      return decryptStudentFields(student);
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return (
    <div className="student-list-container">
      <div className="student-list-header">
        <h2>Registered Students</h2>
        <span>{decryptedStudents.length} Students</span>
      </div>

      <div className="student-card-grid">
        {decryptedStudents.map((student: any) => (
          <div className="student-card" key={student._id}>
            <div className="student-avatar">
              {student.fullName?.charAt(0)}
            </div>

            <h3>{student.fullName}</h3>

            <div className="student-info">
              <p>📧 {student.email}</p>
              <p>📱 {student.phoneNumber}</p>
              <p>🎓 {student.courseEnrolled}</p>
              <p>⚧ {student.gender}</p>
              <p>📅 {student.dateOfBirth}</p>
              <p>📍 {student.address}</p>
            </div>

            <div className="student-card-buttons">
              <button
                className="edit-btn"
                onClick={() => onEdit(student)}
              >
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() =>
  deleteStudent(student._id, student.email)
}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;