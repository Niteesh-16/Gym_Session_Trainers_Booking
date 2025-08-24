
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    age: "",
    sex: "",
    address: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
      alert(res.data.message);
      navigate("/login");
      setFormData({
        name: "",
        email: "",
        number: "",
        age: "",
        sex: "",
        address: "",
        password: "",
      });
    } catch (error) {
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <section className="pt-24 w-screen min-h-screen flex justify-center items-center bg-[#0d1117] px-6 py-10">
      <form
        onSubmit={handleSubmit}
        className="bg-[#1a1f2c] border border-[#00d9ff] p-10 rounded-2xl shadow-xl w-full max-w-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-[#00d9ff]">Register</h2>

        <div className="flex flex-col gap-4 text-white">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#00d9ff] rounded-lg bg-[#0d1117] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#00d9ff] rounded-lg bg-[#0d1117] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
          />

          <input
            type="tel"
            name="number"
            placeholder="Phone Number"
            value={formData.number}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#00d9ff] rounded-lg bg-[#0d1117] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#00d9ff] rounded-lg bg-[#0d1117] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
          />

          <select
            name="sex"
            value={formData.sex}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-[#00d9ff] rounded-lg bg-[#0d1117] text-white focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border border-[#00d9ff] rounded-lg bg-[#0d1117] text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-[#00d9ff]"
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
            Register
          </button>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#00d9ff] hover:underline transition">
              Sign in here
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
};

export default Register;
