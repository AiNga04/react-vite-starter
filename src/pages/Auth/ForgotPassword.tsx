import React, { useState } from "react";
import "./ForgotPassword.scss";
import { FiArrowLeft } from "react-icons/fi";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <div className="password-reset-card">
          <a href="/auth/login" className="back-link">
            <FiArrowLeft /> Back to login
          </a>
          <h2>Reset Password</h2>

          <p className="instruction-text">
            Enter your email address and we'll send you a link
            <br />
            to reset your password.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                required
              />
            </div>

            <button type="submit" className="reset-button">
              Send Reset Link
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
