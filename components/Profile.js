import React, { useState } from "react";

export default function Profile({ user, onUpdateUser, onLogout }) {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    fullName: user.fullName,
    department: user.department,
    academicYear: user.academicYear || "3rd Year",
  });
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }
    if (!form.department.trim()) {
      newErrors.department = "Department cannot be empty.";
    }
    if (!form.academicYear.trim()) {
      newErrors.academicYear = "Academic year / level is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onUpdateUser({
      ...user,
      fullName: form.fullName.trim(),
      department: form.department.trim(),
      academicYear: form.academicYear.trim(),
    });

    setIsEditing(false);
    setSuccessMsg("Profile updated successfully!");
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleCancel = () => {
    setForm({
      fullName: user.fullName,
      department: user.department,
      academicYear: user.academicYear || "3rd Year",
    });
    setErrors({});
    setIsEditing(false);
  };

  return (
    <div className="card">
      <div className="profile-header">
        <div>
          <h2>User Profile</h2>
          <p className="subtitle">Academic Account Details</p>
        </div>
        <span className="role-badge">{user.role}</span>
      </div>

      {successMsg && <div className="alert-success">{successMsg}</div>}

      {!isEditing ? (
        <div className="profile-details">
          <div className="detail-item">
            <span className="detail-label">Full Name:</span>
            <span className="detail-value">{user.fullName}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">University Email:</span>
            <span className="detail-value">{user.email}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Role:</span>
            <span className="detail-value">{user.role}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">University ID:</span>
            <span className="detail-value">{user.universityId}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Department:</span>
            <span className="detail-value">{user.department}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Academic Year / Level:</span>
            <span className="detail-value">{user.academicYear}</span>
          </div>

          <div className="btn-group">
            <button
              type="button"
              className="btn-primary"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
            <button type="button" className="btn-danger" onClick={onLogout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSave} noValidate>
          <div className="form-group">
            <label>University Email (Read-only)</label>
            <input type="email" value={user.email} disabled />
          </div>

          <div className="form-group">
            <label>Role (Read-only)</label>
            <input type="text" value={user.role} disabled />
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
            />
            {errors.fullName && (
              <span className="error">{errors.fullName}</span>
            )}
          </div>

          <div className="form-group">
            <label>Department</label>
            <input
              type="text"
              name="department"
              value={form.department}
              onChange={handleChange}
            />
            {errors.department && (
              <span className="error">{errors.department}</span>
            )}
          </div>

          <div className="form-group">
            <label>Academic Year / Level</label>
            <select
              name="academicYear"
              value={form.academicYear}
              onChange={handleChange}
            >
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Faculty / Staff">Faculty / Staff</option>
            </select>
            {errors.academicYear && (
              <span className="error">{errors.academicYear}</span>
            )}
          </div>

          <div className="btn-group">
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}