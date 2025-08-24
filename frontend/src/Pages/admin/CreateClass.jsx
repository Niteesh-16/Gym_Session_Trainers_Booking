

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateClass = () => {
  const [form, setForm] = useState({ name: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [descWordCount, setDescWordCount] = useState(0);
  const [descError, setDescError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "description") {
      const wc = value.trim().split(/\s+/).filter(Boolean).length;
      setDescWordCount(wc);
      setDescError(wc < 40 ? "Description must be at least 40 words." : "");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const wc = form.description.trim().split(/\s+/).filter(Boolean).length;
    if (wc < 40) {
      setDescError("Description must be at least 40 words.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/admin/classes",
        {
          name: form.name.trim(),
          description: form.description.trim(),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Class created!");
      navigate("/admin/classes");
    } catch (err) {
      alert(
        err.response?.data?.error ||
          "Failed to create class. (Is the name unique?)"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="pt-24 w-full min-h-screen bg-gallery-pattern8 bg-cover bg-fixed max-lg:bg-center max-sm:bg-center flex items-center justify-center">
      <div className="w-full max-w-2xl flex flex-col items-center text-center">
        <p className="mt-10 text-primary text-3xl font-semibold mb-8 tracking-wide">
          CREATE NEW CLASS
        </p>
        <h1 className="mb-10 text-5xl leading-tight font-extrabold text-white max-xl:text-4xl max-sm:text-2xl">
          Add a New Fitness Class
        </h1>
        <div
          className="relative bg-[#1a1f2c] border border-primary rounded-2xl shadow-xl p-10 flex flex-col items-center text-center group transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(0,217,255,0.18)]"
          style={{
            background:
              "linear-gradient(135deg, #1a1f2c 80%, #00d9ff18 100%)",
          }}
        >
          <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
            <div className="text-5xl mb-4 drop-shadow-lg">🏋️‍♀️</div>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Class Name"
              maxLength={100}
              className="mb-4 w-full md:w-96 p-3 rounded-lg bg-[#282c37] border border-primary text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />

            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Class Description (min 40 words)"
              className={`mb-2 w-full md:w-96 h-28 p-3 rounded-lg bg-[#282c37] border ${
                descWordCount < 40 && form.description.length > 0
                  ? "border-red-500"
                  : "border-primary"
              } text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary`}
              required
            />
            <div className="flex justify-between items-center mb-4 w-full md:w-96">
              <span className={`text-sm ${descWordCount < 40 ? "text-red-400" : "text-green-400"}`}>
                {descWordCount} / 40 words
              </span>
              {descError && (
                <span className="text-xs text-red-400">{descError}</span>
              )}
            </div>

            <button
              type="submit"
              className="bg-[#00d9ff] text-white px-12 py-4 rounded-lg text-xl font-bold shadow-lg hover:bg-primary transition"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Class"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreateClass;
