import { useState } from "react";

type Props = {
  onLogin: () => void;
};

const LoginForm = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      alert("Please enter valid email");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters");
      return;
    }

    onLogin();
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

        </form>
      </div>
    </div>
  );
};

export default LoginForm;