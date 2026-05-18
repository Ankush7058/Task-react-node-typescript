import { useState } from "react";
import axios from "axios";

type Props = {
  onLogin: () => void;
};

const API_URL = "http://localhost:5000/api";

const LoginForm = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("admin123");

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

   localStorage.setItem("loggedInEmail", email.trim().toLowerCase());

onLogin();
    } catch (error) {
      alert("Invalid email or password");
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="ring">
        <i style={{ "--clr": "#00ff0a" } as React.CSSProperties}></i>
        <i style={{ "--clr": "#ff0057" } as React.CSSProperties}></i>
        <i style={{ "--clr": "#fffd44" } as React.CSSProperties}></i>

        <form className="login" onSubmit={handleLogin}>
          <h2>Login</h2>

          <div className="inputBx">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="inputBx">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="inputBx">
            <input type="submit" value="Sign in" />
          </div>

          <p className="demo-login-text">Demo: admin@test.com / admin123</p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;