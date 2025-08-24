
// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";

// const Login = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [adminMode, setAdminMode] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const endpoint = adminMode
//       ? "http://localhost:5000/api/admin/login"
//       : "http://localhost:5000/api/users/login";

//     try {
//       const res = await axios.post(endpoint, formData);
//       localStorage.setItem("token", res.data.token);

//       if (adminMode) {
//         alert("Admin login successful!");
//         navigate("/admin/dashboard");
//       } else {
//         alert("User login successful!");
//         navigate("/profile");
//       }
//     } catch (error) {
//       console.error("Login error:", error.response?.data || error.message);
//       alert("Login failed. Please check your credentials.");
//     }
//   };

//   return (
//     <section className="pt-24 w-screen min-h-screen flex justify-center items-center bg-[#0d1117] px-6 py-10">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#1a1f2c] border border-[#00d9ff] p-10 rounded-2xl shadow-xl w-full max-w-lg"
//       >
//         <h2 className="text-3xl font-bold text-center mb-6 text-[#00d9ff]">
//           {adminMode ? "Admin Login" : "Login"}
//         </h2>

//         <div className="flex flex-col gap-4 text-white">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email Address"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="px-4 py-2 border border-[#00d9ff] rounded-lg bg-[#0d1117] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
//           />

//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 pr-12 border border-[#00d9ff] rounded-lg bg-[#0d1117] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute top-2.5 right-3 text-xl text-[#00d9ff] focus:outline-none"
//             >
//               {showPassword ? <FaEyeSlash /> : <FaEye />}
//             </button>
//           </div>

//           <button
//             type="submit"
//             className="bg-[#00d9ff] text-white font-bold py-3 rounded-lg hover:bg-[#00bcd4] transition mt-2"
//           >
//             {adminMode ? "Admin Login" : "Login"}
//           </button>

//           <button
//             type="button"
//             className="text-[#00d9ff] hover:underline mt-2"
//             onClick={() => setAdminMode((prev) => !prev)}
//           >
//             {adminMode ? "Login as User" : "Login as Admin"}
//           </button>

//           {!adminMode && (
//             <p className="text-center text-sm text-gray-400 mt-4">
//               Don&apos;t have an account?{" "}
//               <Link
//                 to="/registration"
//                 className="text-[#00d9ff] hover:underline transition"
//               >
//                 Register here
//               </Link>
//             </p>
//           )}
//         </div>
//       </form>
//     </section>
//   );
// };

// export default Login;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [adminMode, setAdminMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Show verification alert if email was verified
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const verified = query.get("verified");

    if (verified === "1") {
      alert("✅ Your email has been verified! You can now log in.");
    } else if (verified === "0") {
      alert("❌ Verification failed or expired.");
    }
  }, [location.search]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = adminMode
      ? "http://localhost:5000/api/admin/login"
      : "http://localhost:5000/api/users/login";

    try {
      const res = await axios.post(endpoint, formData);
      localStorage.setItem("token", res.data.token);

      if (adminMode) {
        alert("Admin login successful!");
        navigate("/admin/dashboard");
      } else {
        alert("User login successful!");
        navigate("/profile");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <section className="pt-24 w-screen min-h-screen flex justify-center items-center bg-[#0d1117] px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1f2c] border border-[#00d9ff] p-10 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#00d9ff]">
          {adminMode ? "Admin Login" : "Login"}
        </h2>

        <div className="flex flex-col gap-4 text-white">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="px-4 py-2 border border-[#00d9ff] rounded-lg bg-[#0d1117] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 pr-12 border border-[#00d9ff] rounded-lg bg-[#0d1117] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2.5 right-3 text-xl text-[#00d9ff] focus:outline-none"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            type="submit"
            className="bg-[#00d9ff] text-white font-bold py-3 rounded-lg hover:bg-[#00bcd4] transition mt-2"
          >
            {adminMode ? "Admin Login" : "Login"}
          </button>

          <button
            type="button"
            className="text-[#00d9ff] hover:underline mt-2"
            onClick={() => setAdminMode((prev) => !prev)}
          >
            {adminMode ? "Login as User" : "Login as Admin"}
          </button>

          {!adminMode && (
            <p className="text-center text-sm text-gray-400 mt-4">
              Don&apos;t have an account?{" "}
              <Link
                to="/registration"
                className="text-[#00d9ff] hover:underline transition"
              >
                Register here
              </Link>
            </p>
          )}
        </div>
      </form>
    </section>
  );
};

export default Login;
