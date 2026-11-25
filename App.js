import React, { useState, useEffect } from "react";
// استدعاء الصفحات وملف التنسيق
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import "./App.css";

// حساب تجريبي جاهز اول ما المشروع يشتغل
const SEED_USERS = [
  {
    name: "Sara Student",
    email: "student@uni.edu.eg",
    password: "123456",
    role: "Student",
    department: "Computer Science",
  }
];

function App() {
  // المستخدم الحالي والتبويب المفتوح دلوقتي
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState("login");

  // اول ما التطبيق يفتح حط الحساب التجريبي وهات المستخدم المسجل لو موجود
  useEffect(() => {
    const existingUsers = localStorage.getItem("users");
    if (!existingUsers) {
      localStorage.setItem("users", JSON.stringify(SEED_USERS));
    }

    const savedUser = localStorage.getItem("currentUser");
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  // عند نجاح الدخول احفظ المستخدم وروح للبروفايل
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem("currentUser", JSON.stringify(user));
    setActiveTab("profile");
  };

  // عند الخروج امسح الجلسه وارجع لصفحه الدخول
  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setActiveTab("login");
  };

  // اختيار الصفحه المعروضه حسب التبويب الحالي
  const renderContent = () => {
    if (activeTab === "register") {
      return <Register onSwitchToLogin={() => setActiveTab("login")} />;
    }

    if (activeTab === "profile") {
      return (
        <Profile
          user={currentUser}
          onLogout={handleLogout}
          onGoToLogin={() => setActiveTab("login")}
          onGoToRegister={() => setActiveTab("register")}
        />
      );
    }

    return (
      <Login
        onLoginSuccess={handleLoginSuccess}
        onSwitchToRegister={() => setActiveTab("register")}
      />
    );
  };

  return (
    <div className="app-shell" dir="ltr">
      {/* شريط التنقل العلوي واسم النظام */}
      <header className="top-navbar">
        <div className="brand-title">Course Feedback &amp; Evaluation System</div>
        <nav className="nav-actions">
          {/* زراير التنقل بين التسجيل والدخول والبروفايل */}
          <button
            type="button"
            className={`nav-btn ${activeTab === "register" ? "active" : ""}`}
            onClick={() => setActiveTab("register")}
          >
            Register
          </button>
          <button
            type="button"
            className={`nav-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            type="button"
            className={`nav-btn ${activeTab === "profile" ? "active" : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            Profile
          </button>
        </nav>
      </header>

      {/* مكان عرض الصفحه النشطه */}
      <main className="main-content">{renderContent()}</main>
    </div>
  );
}

export default App;