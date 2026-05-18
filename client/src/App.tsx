import { useEffect, useState } from "react";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

const API_URL = "http://localhost:5000/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
  localStorage.getItem("isLoggedIn") === "true"
);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(`${API_URL}/students`);
      setStudents(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchStudents();
    }
  }, [isLoggedIn]);

return (
  <>
    {!isLoggedIn ? (
    <LoginForm
  onLogin={() => {
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
  }}
/>
    ) : (
    <div className="app">
  <div className="top-bar">
    <h1>React + Node Student CRUD with 2-Level Encryption</h1>

    <button
      className="logout-btn"
    onClick={() => {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("loggedInEmail");

  setIsLoggedIn(false);
  setSelectedStudent(null);
}}
    >
      Logout
    </button>
  </div>
        <StudentForm
          selectedStudent={selectedStudent}
          clearSelectedStudent={() => setSelectedStudent(null)}
          refreshStudents={fetchStudents}
        />

        <StudentList
          students={students}
          setStudents={setStudents}
          onEdit={setSelectedStudent}
        />
      </div>
    )}
  </>
);
}

export default App;