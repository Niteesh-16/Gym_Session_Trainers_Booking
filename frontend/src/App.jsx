
//Added
import React from "react";
import { Routes, Route } from "react-router-dom";

// Importing pages from /Pages folder
import Register from "./Pages/Register";
import Home from "./Pages/HomePage";
import Nav from "./Components/Nav";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Services from "./Pages/Services";
import Contact from "./Pages/Contact";
import Profile from "./Pages/Profile";
import ProtectedRoute from "./Components/ProtectedRoute";
import ClassDetailPage from "./Pages/ClassDetailPage";

// ======= Admin Pages, now under /pages/admin =======
import AdminDashboard from "./Pages/admin/Dashboard";
import CreateClass from "./Pages/admin/CreateClass";
import ViewClasses from "./Pages/admin/ViewClasses";
import ClassDetail from "./Pages/admin/ClassDetail";

// --- Optional: You can also create an AdminProtectedRoute component ---
// See note below to restrict *only admins*

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact-us" element={<Contact />} />

        {/* User-Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/classes/:className"
          element={
            <ProtectedRoute>
              <ClassDetailPage />
            </ProtectedRoute>
          }
        />

        {/* ===== Admin Dashboard and Admin-Protected pages ===== */}

        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute admin>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/create-class"
          element={
            <ProtectedRoute admin>
              <CreateClass />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/classes"
          element={
            <ProtectedRoute admin>
              <ViewClasses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/classes/:name"
          element={
            <ProtectedRoute admin>
              <ClassDetail />
            </ProtectedRoute>
          }
        />
        

      </Routes>
    </>
  );
}

export default App;
