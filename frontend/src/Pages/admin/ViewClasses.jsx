
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ViewClasses = () => {
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState({});
  const [showFormFor, setShowFormFor] = useState(null); // classId
  const [trainerForm, setTrainerForm] = useState({
    name: "",
    session_time: "",
    slot_limit: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch all classes and for each, fetch trainers
  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/admin/classes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setClasses(res.data || []);
        (res.data || []).forEach((cls) => fetchTrainers(cls.name, token));
      });
    // eslint-disable-next-line
  }, []);

  // Fetch trainers for a class
  const fetchTrainers = (className, token) => {
    axios
      .get(
        `http://localhost:5000/api/admin/trainers?class_name=${encodeURIComponent(className)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((trRes) => {
        setTrainers((prev) => ({
          ...prev,
          [className]: trRes.data || []
        }));
      });
  };

  // Show add-trainer form for class
  const startAddTrainer = (e, classId) => {
    e.stopPropagation(); // prevent card click (navigating)
    setShowFormFor(classId);
    setTrainerForm({ name: "", session_time: "", slot_limit: "" });
  };

  // Handle add trainer form change
  const handleTrainerChange = (e) => {
    setTrainerForm({ ...trainerForm, [e.target.name]: e.target.value });
  };

  // Handle trainer creation
  const handleAddTrainer = async (e, classObj) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "http://localhost:5000/api/admin/trainers",
        {
          name: trainerForm.name,
          class_name: classObj.name,
          session_time: trainerForm.session_time,
          slot_limit: Number(trainerForm.slot_limit)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTrainers(classObj.name, token);
      setShowFormFor(null);
      setTrainerForm({ name: "", session_time: "", slot_limit: "" });
    } catch (err) {
      alert(
        err.response?.data?.error || "Failed to add trainer. Check fields and class name."
      );
    }
    setLoading(false);
  };

  return (
    <section className="pt-24 w-full min-h-screen bg-gallery-pattern8 bg-cover bg-fixed flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col items-center text-center">
        <p className="mt-10 text-primary text-3xl font-semibold mb-8 tracking-wide">
          CLASS MANAGEMENT
        </p>
        <h1 className="mb-10 text-6xl leading-tight font-extrabold text-white">
          All Classes
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 w-full mb-12">
          {classes.length === 0 && (
            <div className="col-span-full text-2xl text-gray-300 mt-10">
              No classes created yet.
            </div>
          )}
          {classes.map((cls) => (
            <div
              key={cls.id}
              className="relative bg-[#1a1f2c] border border-primary rounded-2xl shadow-xl p-10 flex flex-col items-center justify-center text-center group transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(0,217,255,0.25)] hover:-translate-y-2"
              style={{
                background: "linear-gradient(135deg,#1a1f2c 80%,#00d9ff18 100%)",
                cursor: "pointer",
              }}
              onClick={e =>
                // Do not navigate if user is interacting with the form/buttons inside
                (e.target.tagName === 'BUTTON' || e.target.closest('form'))
                  ? null
                  : navigate(`/admin/classes/${encodeURIComponent(cls.name)}`)
              }
            >
              <div className="text-5xl mb-3 drop-shadow-lg">🏷️</div>
              <h2 className="text-2xl font-bold text-primary mb-2">
                {cls.name}
              </h2>
              <p className="text-gray-300 text-base mb-4">
                {cls.description}
              </p>

              {/* Add Trainer Option */}
              <button
                onClick={e => startAddTrainer(e, cls.id)}
                className="mb-5 bg-[#00d9ff] text-white px-5 py-2 rounded font-semibold shadow hover:bg-primary transition"
              >
                Add Trainer
              </button>
              {showFormFor === cls.id && (
                <form
                  onClick={e => e.stopPropagation()} // prevent bubbling to card
                  onSubmit={e => handleAddTrainer(e, cls)}
                  className="w-full mb-4 flex flex-col items-center gap-2"
                >
                  <input
                    type="text"
                    name="name"
                    value={trainerForm.name}
                    onChange={handleTrainerChange}
                    placeholder="Trainer Name"
                    required
                    className="w-full px-2 py-1 rounded text-gray-700"
                  />
                  <input
                    type="text"
                    name="session_time"
                    value={trainerForm.session_time}
                    onChange={handleTrainerChange}
                    placeholder="Session Time"
                    required
                    className="w-full px-2 py-1 rounded text-gray-700"
                  />
                  <input
                    type="number"
                    min={1}
                    name="slot_limit"
                    value={trainerForm.slot_limit}
                    onChange={handleTrainerChange}
                    placeholder="Slot Limit"
                    required
                    className="w-full px-2 py-1 rounded text-gray-700"
                  />
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="bg-[#00d9ff] text-white px-5 py-1 rounded-lg font-semibold"
                      disabled={loading}
                    >
                      {loading ? "Adding..." : "Add"}
                    </button>
                    <button
                      type="button"
                      onClick={e => { e.stopPropagation(); setShowFormFor(null); }}
                      className="px-4 py-1 rounded bg-gray-500 text-white"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="w-full mt-4" onClick={e => e.stopPropagation()}>
                <h3 className="text-primary text-lg font-semibold mb-2">
                  Trainers:
                </h3>
                <ul>
                  {(trainers[cls.name] || []).length === 0 && (
                    <li className="text-gray-500 italic">
                      No trainers yet…
                    </li>
                  )}
                  {(trainers[cls.name] || []).map((tr) => (
                    <li key={tr.id} className="text-gray-300 text-base mb-1">
                      <span className="font-semibold text-white">{tr.name}</span>
                      <span className="ml-2 text-gray-400">
                        ({tr.session_time}) [Slots: {tr.slot_limit}]
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <p className="text-sm text-gray-400 mt-4">
                Click anywhere else on this card to view trainers & users in detail
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewClasses;
