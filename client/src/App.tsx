import { useEffect, useState } from "react";
import axios from "axios";
import LoginForm from "./components/LoginForm";
import StudentForm from "./components/StudentForm";
import StudentList from "./components/StudentList";

const API_URL = "http://localhost:5000/api";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      <LoginForm onLogin={() => setIsLoggedIn(true)} />
    ) : (
      <div className="app">
        <h1>React + Node Student CRUD with 2-Level Encryption</h1>

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