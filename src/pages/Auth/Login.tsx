import React, { useState } from "react";
import "./Login.scss";
import googleIcon from "../../assets/images/google.png";
import githubIcon from "../../assets/images/github.png";
import facebookIcon from "../../assets/images/facebook.png";
import logoIcon from "../../assets/images/user.png";

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);

  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", username, password, rememberMe);
    getData();
  };

  const getData = async () => {
    const url = "http://localhost:8000/api/v1/auth/login";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="logo-container">
          <img src={logoIcon} alt="logo" />
        </div>
        <h2>WELCOME BACK</h2>
        <p>Please enter your details</p>

        <form onSubmit={(e) => handleSubmitForm(e)}>
          <div className="input-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter email"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="options">
            <div className="remember-me">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember">Remember</label>
            </div>
            <a href="/auth/forgot-password" className="forgot-password">
              Forgot password
            </a>
          </div>

          <button type="submit" className="sign-in-btn">
            LOGIN
          </button>
        </form>

        <div className="divider">or continue with</div>

        <div className="social-login">
          <button className="social-btn">
            <img src={googleIcon} alt="Google" />
          </button>
          <button className="social-btn">
            <img src={githubIcon} alt="GitHub" />
          </button>
          <button className="social-btn">
            <img src={facebookIcon} alt="Facebook" />
          </button>
        </div>

        <p className="register-link">
          Don't have an account? <a href="/auth/register">Sign up</a>
        </p>

        <a href="/" className="go-back">
          Go back home
        </a>
      </div>
    </div>
  );
};

export default Login;
