
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ClassDetailPage() {
  const { className } = useParams(); // from URL param
  const [trainers, setTrainers] = useState([]);
  const [bookedKeys, setBookedKeys] = useState([]);
  const [slotsLeft, setSlotsLeft] = useState({});
  const [loadingSlots, setLoadingSlots] = useState(true);

  // Capitalize/display class name for heading
  const classDisplayName =
    className
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join(" ");

  // Fetch trainers for this class from DB
  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `http://localhost:5000/api/admin/trainers?class_name=${encodeURIComponent(classDisplayName)}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setTrainers(res.data || []);
      } catch (err) {
        setTrainers([]);
        console.error("Error loading trainers:", err);
      }
    };
    fetchTrainers();
  }, [classDisplayName]);

  // Fetch bookings and slots
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const bookingRes = await axios.get(
        `http://localhost:5000/api/users/book-class?class_name=${encodeURIComponent(classDisplayName)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const bookings = Array.isArray(bookingRes.data) ? bookingRes.data : [];
      const keys = bookings.map((b) => `${b.trainer_name}||${b.session_time}`);
      setBookedKeys(keys);

      const slotRes = await axios.get(
        `http://localhost:5000/api/users/trainer-slots?class_name=${encodeURIComponent(classDisplayName)}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSlotsLeft(slotRes.data || {});
    } catch (err) {
      setBookedKeys([]);
      setSlotsLeft({});
      console.error("Error fetching booking data:", err);
    } finally {
      setLoadingSlots(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line
  }, [classDisplayName, trainers.length]); // reload when trainers load

  // Booking handler
  const handleBook = async (trainer, timing) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/users/book-class",
        {
          class_name: classDisplayName,
          trainer_name: trainer,
          session_time: timing,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchData(); // Refresh bookings/slots
    } catch (err) {
      alert(err.response?.data?.error || "Booking failed");
    }
  };

  return (
    <section className="w-full min-h-screen bg-service-pattern bg-cover bg-fixed py-16">
      <div className="max-container padding-hero-y padding-x">
        <h1 className="text-4xl font-bold text-primary mb-12 text-center">
          {classDisplayName.toUpperCase()}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 place-items-center">
          {trainers.length === 0 ? (
            <div className="col-span-full text-lg text-gray-400">
              No trainers found for this class.
            </div>
          ) : (
            trainers.map((t, idx) => {
              const key = `${t.name}||${t.session_time}`;
              const isBooked = bookedKeys.includes(key);
              const slots = slotsLeft[key];
              const isFull = typeof slots === "number" && slots <= 0;

              return (
                <div
  key={t.id ?? idx}
  className="relative bg-[#21293a] h-[260px] w-full pt-8 pb-7 px-6 text-center flex flex-col items-center justify-between rounded-2xl shadow-lg transition-all duration-300
    hover:shadow-[0_0_24px_8px_rgba(0,180,255,0.33)] hover:border-[2px] hover:border-[#00b4ff] border border-[#28324a]"
  style={{ maxWidth: "320px", minWidth: "220px" }}
>
  <h2 className="text-2xl font-bold text-[#0ecaff] mb-1">
    {t.name}
  </h2>
  <p className="mb-1 text-base text-gray-300">{t.session_time}</p>
  <p
    className={`mb-4 text-sm font-bold ${
      isFull ? "text-red-400" : "text-blue-200"
    }`}
  >
    {loadingSlots
      ? "Loading slots..."
      : typeof slots === "number"
      ? `Slots Left: ${slots}`
      : "Slots Left: 0"}
  </p>
  <button
    className={`w-full py-2 rounded-lg text-base font-semibold shadow transition-all duration-200
      ${
        isBooked
          ? "bg-green-500 text-white cursor-not-allowed"
          : isFull
          ? "bg-gray-500 text-white cursor-not-allowed"
          : "bg-[#0ecaff] text-white hover:bg-[#21293a] hover:text-[#0ecaff] hover:shadow-[0_0_10px_2px_rgba(0,180,255,0.52)] border border-[#0ecaff] hover:border-[#fff]"
      }`}
    onClick={() => handleBook(t.name, t.session_time)}
    disabled={isBooked || isFull || loadingSlots}
    type="button"
  >
    {isBooked ? "Booked" : isFull ? "Full" : "Book"}
  </button>
</div>

              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
