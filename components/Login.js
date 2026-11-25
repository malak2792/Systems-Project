import React, { useState } from "react";

export default function Login({ users, onLoginSuccess, switchToRegister }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setAuthError("");
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.email.trim()) {
      newErrors.email = "University email is required.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const matchedUser = users.find(
      (u) =>
        u.email.toLowerCase() === form.email.trim().toLowerCase() &&
        u.password === form.password
    );

    if (!matchedUser) {
      setAuthError("Invalid university email or password.");
      return;
    }

    onLoginSuccess(matchedUser);
  };

  return (
    <div className="card">
      <h2>Welcome Back</h2>
      <p className="subtitle">Login to Course Feedback & Evaluation System</p>

      {authError && <div className="alert-error">{authError}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>University Email</label>
          <input
            type="email"
            name="email"
            placeholder="e.g., sara@uni.edu.eg"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>

      <div className="demo-hint">
        Demo account: <strong>student@uni.edu.eg</strong> / <strong>123456</strong>
      </div>

      <p className="switch-text">
        Don&apos;t have an account?{" "}
        <button type="button" className="link-btn" onClick={switchToRegister}>
          Create an account
        </button>
      </p>
    </div>
  );
}