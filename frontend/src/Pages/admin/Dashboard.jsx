import React from "react";
import { useNavigate } from "react-router-dom";

const adminSections = [
  {
    icon: "📚",
    label: "View Classes",
    desc: "See, edit, and manage all classes, trainers, and enrolled users.",
    action: (navigate) => navigate("/admin/classes"),
  },
  {
    icon: "➕",
    label: "Create Class",
    desc: "Add a new fitness class with name and description.",
    action: (navigate) => navigate("/admin/create-class"),
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <section
      className="pt-24 w-full min-h-screen bg-gallery-pattern8 bg-cover bg-fixed max-lg:bg-center max-sm:bg-center flex items-center justify-center"
    >
      <div className="w-full max-w-4xl flex flex-col items-center text-center">
        <p className="mt-10 text-primary text-3xl font-semibold mb-8 tracking-wide">
          ADMIN DASHBOARD
        </p>
        <h1 className="mb-10 text-6xl leading-tight font-extrabold text-white max-xl:text-5xl max-sm:text-3xl">
          Quick Controls
        </h1>
        <div className="grid md:grid-cols-2 gap-10 w-full mb-12">
          {adminSections.map((section) => (
            <div
              key={section.label}
              tabIndex={0}
              role="button"
              onClick={() => section.action(navigate)}
              onKeyDown={e => e.key === "Enter" && section.action(navigate)}
              className="relative bg-[#1a1f2c] border border-primary rounded-2xl shadow-xl p-10 flex flex-col items-center text-center group transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(0,217,255,0.25)] hover:-translate-y-2 cursor-pointer outline-none"
              style={{
                background: "linear-gradient(135deg, #1a1f2c 80%, #00d9ff18 100%)",
              }}
            >
              <div className="text-5xl mb-4 drop-shadow-lg">{section.icon}</div>
              <h2 className="text-2xl font-bold text-primary mb-3">{section.label}</h2>
              <p className="text-lg text-gray-300">{section.desc}</p>
              <span className="pointer-events-none absolute inset-0 rounded-2xl group-hover:shadow-[0_0_32px_4px_rgba(0,217,255,0.06)] transition-all duration-300"></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
