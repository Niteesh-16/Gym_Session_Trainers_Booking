
import React, { useState } from "react";

const scheduleData = {
  Sunday: [{ name: "Arjun Shah", time: "6am - 8am" }],
  Monday: [{ name: "Kiran Reddy", time: "6am - 8am" }],
  Tuesday: [{ name: "Kiran Reddy", time: "6am - 8am" }],
  Wednesday: [{ name: "Arjun Shah", time: "6am - 8am" }],
  Thursday: [{ name: "Arjun Shah", time: "6am - 8am" }],
  Friday: [{ name: "Kiran Reddy", time: "6am - 8am" }],
  Saturday: [{ name: "Arjun Shah", time: "6am - 8am" }],
};

const days = Object.keys(scheduleData);

const TimeSchedule = () => {
  const [activeDay, setActiveDay] = useState("Sunday");

  return (
    <section id="schedule" className="w-full bg-service-pattern bg-cover bg-fixed text-white">
      <div className="max-container padding-hero-y padding-x">
        {/* Heading */}
        <p className="text-primary relative before:absolute before:w-20 before:h-1 before:bg-primary before:top-[50%] before:left-0 pl-24 text-xl before:translate-y-[-50%] text-center w-fit m-auto">
          TRAINERS
        </p>

        <div className="text-5xl font-semibold mt-5 mb-16 text-center leading-[60px] max-md:text-3xl max-md:leading-[40px]">
          <h1>SELECT THE PERFECT TIME YOU NEED NOW</h1>
        </div>

        {/* Day Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`px-5 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
                activeDay === day
                  ? "bg-primary text-white"
                  : "bg-white text-black hover:bg-primary hover:text-white"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {scheduleData[activeDay].map((slot, index) => (
            <div
              key={index}
              className="bg-white text-black rounded-2xl shadow-xl p-6 transition-all hover:scale-105 duration-300"
            >
              <p className="text-sm font-medium text-primary mb-2">Time Slot</p>
              <h2 className="text-2xl font-semibold mb-4">{slot.time}</h2>
              <p className="text-lg font-bold">{slot.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimeSchedule;
