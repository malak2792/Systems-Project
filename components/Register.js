import React, { useState } from "react";

export default function Register({ onRegisterSuccess, switchToLogin }) {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "Student",
    department: "",
    universityId: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};

    // التحقق من الاسم الكامل
    if (!form.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    } else if (form.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }

    // التحقق من الإيميل الجامعي
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim()) {
      newErrors.email = "University email is required.";
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    } else if (
      !form.email.toLowerCase().endsWith(".edu") &&
      !form.email.toLowerCase().includes(".edu.")
    ) {
      newErrors.email =
        "Must be a valid university email (e.g., name@university.edu.eg).";
    }

    // التحقق من الرقم السري
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    // التحقق من تأكيد الرقم السري
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    // التحقق من الدور
    if (!["Student", "Instructor", "Quality Team"].includes(form.role)) {
      newErrors.role = "Please select a valid role.";
    }

    // التحقق من القسم
    if (!form.department.trim()) {
      newErrors.department = "Department is required (e.g., Computer Science).";
    }

    // التحقق من الرقم الجامعي
    if (!form.universityId.trim()) {
      newErrors.universityId = "University ID is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const newUser = {
      fullName: form.fullName.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password,
      role: form.role,
      department: form.department.trim(),
      universityId: form.universityId.trim(),
      academicYear: form.role === "Student" ? "3rd Year" : "Faculty / Staff",
    };

    onRegisterSuccess(newUser);
  };

  return (
    <div className="card">
      <h2>Create Account</h2>
      <p className="subtitle">Course Feedback & Evaluation System</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="e.g., Sara Ahmed"
            value={form.fullName}
            onChange={handleChange}
          />
          {errors.fullName && <span className="error">{errors.fullName}</span>}
        </div>

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

        <div className="form-row">
          <div className="form-group">
            <label>Role</label>
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="Student">Student</option>
              <option value="Instructor">Instructor</option>
              <option value="Quality Team">Quality Team</option>
            </select>
            {errors.role && <span className="error">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label>University ID</label>
            <input
              type="text"
              name="universityId"
              placeholder="e.g., 20230145"
              value={form.universityId}
              onChange={handleChange}
            />
            {errors.universityId && (
              <span className="error">{errors.universityId}</span>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            placeholder="e.g., Computer Science"
            value={form.department}
            onChange={handleChange}
          />
          {errors.department && (
            <span className="error">{errors.department}</span>
          )}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Min 6 characters"
              value={form.password}
              onChange={handleChange}
            />
            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
        </div>

        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>

      <p className="switch-text">
        Already have an account?{" "}
        <button type="button" className="link-btn" onClick={switchToLogin}>
          Login here
        </button>
      </p>
    </div>
  );
}