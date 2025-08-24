
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ClassDetail = () => {
  const { name } = useParams();
  const [trainers, setTrainers] = useState([]);
  const [usersByTrainer, setUsersByTrainer] = useState({});
  const [availableSlots, setAvailableSlots] = useState({});
  const [loading, setLoading] = useState(true);

  // For updating a trainer
  const [showUpdateFor, setShowUpdateFor] = useState(null); // trainer.id or null
  const [updateForm, setUpdateForm] = useState({ session_time: "", slot_limit: "" });
  const [updating, setUpdating] = useState(false);

  const navigate = useNavigate();

  const fetchTrainersAndUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const trRes = await axios.get(
        `http://localhost:5000/api/admin/trainers?class_name=${encodeURIComponent(name)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const trainersData = trRes.data || [];
      setTrainers(trainersData);
      setLoading(false);

      const slotRes = await axios.get(
        `http://localhost:5000/api/users/trainer-slots?class_name=${encodeURIComponent(name)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setAvailableSlots(slotRes.data || {});

      // Reset usersByTrainer for this class
      let usersTemp = {};
      await Promise.all(
        trainersData.map(async (trainer) => {
          const uRes = await axios.get(
            `http://localhost:5000/api/admin/trainer-users?class_name=${encodeURIComponent(name)}&trainer_name=${encodeURIComponent(trainer.name)}&session_time=${encodeURIComponent(trainer.session_time)}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          usersTemp[trainer.id] = uRes.data || [];
        })
      );
      setUsersByTrainer(usersTemp);
    } catch (err) {
      console.error("Error fetching trainers or users:", err);
    }
  };

  useEffect(() => {
    fetchTrainersAndUsers();
    // eslint-disable-next-line
  }, [name]);

  const handleDeleteTrainer = async (trainerId) => {
    const confirm = window.confirm("Are you sure you want to delete this trainer?");
    if (!confirm) return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:5000/api/admin/trainers/${trainerId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTrainers((prev) => prev.filter((t) => t.id !== trainerId));
      const updatedUsers = { ...usersByTrainer };
      delete updatedUsers[trainerId];
      setUsersByTrainer(updatedUsers);
    } catch (err) {
      console.error("Failed to delete trainer:", err);
      alert("Failed to delete trainer");
    }
  };

  const handleUpdateClick = (trainer) => {
    setShowUpdateFor(trainer.id);
    setUpdateForm({
      session_time: trainer.session_time,
      slot_limit: trainer.slot_limit,
    });
  };

  const handleTrainerUpdate = async (e, trainer) => {
    e.preventDefault();
    setUpdating(true);
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:5000/api/admin/trainers/${trainer.id}`,
        {
          session_time: updateForm.session_time,
          slot_limit: Number(updateForm.slot_limit),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Reload everything including slots/users
      setShowUpdateFor(null);
      await fetchTrainersAndUsers();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to update trainer.");
    }
    setUpdating(false);
  };

  return (
    <section className="pt-24 w-full min-h-screen bg-gallery-pattern8 bg-cover bg-fixed flex items-center justify-center">
      <div className="w-full max-w-6xl flex flex-col items-center text-center px-4">
        <button
          onClick={() => navigate("/admin/classes")}
          className="mb-8 self-start bg-primary text-white px-6 py-2 rounded font-bold shadow hover:bg-[#099dcf]"
        >
          ← All Classes
        </button>
        <h1 className="mb-10 text-4xl font-extrabold text-white">
          {name} - Trainers & Members
        </h1>
        {loading ? (
          <div className="text-gray-300 text-xl py-10">Loading...</div>
        ) : (
          <div className="grid md:grid-cols-2 gap-10 w-full mb-12">
            {trainers.length === 0 && (
              <div className="col-span-full text-gray-300">
                No trainers found for this class.
              </div>
            )}
            {trainers.map((trainer) => {
              const key = `${trainer.name}||${trainer.session_time}`;
              const slotsLeft = availableSlots[key] ?? "N/A";
              const bookedUsers = usersByTrainer[trainer.id] || [];

              return (
                <div
                  key={trainer.id}
                  className="relative bg-[#1a1f2c] border border-primary rounded-2xl shadow-xl p-8 flex flex-col items-center text-center group transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(0,217,255,0.25)]"
                  style={{
                    background: "linear-gradient(135deg,#1a1f2c 80%,#00d9ff18 100%)",
                  }}
                >
                  <div className="text-4xl mb-3 drop-shadow-lg">🧑‍🏫</div>
                  <h2 className="text-xl font-bold text-primary mb-2">
                    {trainer.name}
                  </h2>
                  <p className="text-gray-300 mb-1">
                    Time: {trainer.session_time}
                  </p>
                  <p className="text-gray-300 mb-1">
                    Slot Limit: {trainer.slot_limit}
                  </p>
                  <p className="text-green-400 font-semibold mb-3">
                    Slots Left: {slotsLeft}
                  </p>

                  {/* --- UPDATE TRAINER button & form --- */}
                  <button
                    className="mt-2 px-5 py-2 rounded bg-[#0ecaff] text-white font-semibold shadow hover:bg-[#099dcf] transition"
                    onClick={() => handleUpdateClick(trainer)}
                    style={{ marginBottom: showUpdateFor === trainer.id ? 0 : 16 }}
                  >
                    ✏️ Update Trainer
                  </button>
                  {showUpdateFor === trainer.id && (
                    <form
                      className="mt-2 w-full flex flex-col items-center gap-2"
                      onSubmit={e => handleTrainerUpdate(e, trainer)}
                    >
                      <input
                        type="text"
                        name="session_time"
                        placeholder="Session Time"
                        value={updateForm.session_time}
                        onChange={e => setUpdateForm(f => ({ ...f, session_time: e.target.value }))}
                        required
                        className="w-full px-2 py-1 rounded text-gray-800"
                      />
                      <input
                        type="number"
                        min={1}
                        name="slot_limit"
                        placeholder="Slot Limit"
                        value={updateForm.slot_limit}
                        onChange={e => setUpdateForm(f => ({ ...f, slot_limit: e.target.value }))}
                        required
                        className="w-full px-2 py-1 rounded text-gray-800"
                      />
                      <div className="flex gap-2 mt-2">
                        <button
                          type="submit"
                          className="bg-[#0ecaff] text-white px-5 py-1 rounded-lg font-semibold"
                          disabled={updating}
                        >
                          {updating ? "Saving..." : "Save"}
                        </button>
                        <button
                          type="button"
                          className="px-4 py-1 rounded bg-gray-600 text-white"
                          onClick={() => setShowUpdateFor(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}

                  {/* --- DELETE TRAINER --- (now BELOW update) */}
                  <button
                    onClick={() => handleDeleteTrainer(trainer.id)}
                    className="mt-2 text-sm text-red-500 font-semibold mb-4 hover:text-red-400 transition"
                  >
                    🗑️ Delete Trainer
                  </button>

                  <div className="w-full mt-2 text-left">
                    <h3 className="text-primary text-md font-semibold mb-2">
                      Booked Users:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {bookedUsers.length === 0 ? (
                        <p className="text-gray-500 italic">No users yet…</p>
                      ) : (
                        bookedUsers.map((user, idx) => (
                          <div
                            key={idx}
                            className="bg-[#273043] text-white px-4 py-2 rounded-full shadow-sm flex flex-col sm:flex-row items-center gap-2 text-sm border border-gray-600"
                          >
                            <span className="font-semibold">{user.name}</span>
                            <span className="text-gray-300">
                              ({user.sex}, {user.age})
                            </span>
                            <span className="text-gray-400">
                              📧 {user.email}
                            </span>
                            <span className="text-gray-400">
                              📞 {user.number}
                            </span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ClassDetail;
