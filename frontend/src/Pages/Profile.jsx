
//Can click anywhere on the card to redirect
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [classes, setClasses] = useState([]); // Store classes fetched from backend
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndClasses = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch user profile
        const profileRes = await axios.get('http://localhost:5000/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(profileRes.data);

        // Fetch classes dynamically from backend
        const classesRes = await axios.get('http://localhost:5000/api/admin/classes', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Format fetched classes as needed (add icon and desc dynamically or hardcode icons by class name)
        setClasses(classesRes.data || []);
      } catch (err) {
        console.error('Failed to load profile or classes', err);
      }
    };
    fetchProfileAndClasses();
  }, []);

  if (!profile) return <div className="text-primary text-center p-10 text-lg">Loading...</div>;

  // Optional: Map class names to icons and descriptions if needed
  const iconMap = {
    "Boxing Class": "🥊",
    "Weightlifting": "🏋️‍♀️",
    "Zumba": "💃",
    // Add more mappings as needed
  };

  return (
    <section className="w-full min-h-screen bg-service-pattern bg-cover bg-fixed py-16">
      <div className="max-container padding-hero-y padding-x">
        <div className="flex justify-center mb-28 max-lg:flex-col max-lg:items-center max-lg:gap-5 max-sm:mb-20">
          <div>
            <p className="text-primary relative before:absolute before:w-20 before:h-1 before:bg-primary before:top-[50%] before:left-0 pl-24 text-2xl before:translate-y-[-50%] text-center mb-4">
              YOUR PROFILE
            </p>
            <h1 className="text-6xl text-white mt-8 leading-[60px] max-w-[65%] font-semibold mx-auto mb-10 max-xl:text-4xl max-lg:text-5xl max-sm:text-3xl text-center">
              Welcome, {profile.name}
            </h1>
            <p className="text-center text-gray-300 mb-16 max-w-xl mx-auto">
              Email: {profile.email} | Age: {profile.age} | Number: {profile.number}
            </p>
          </div>
        </div>

        {/* Dynamic Class Cards */}
        {/* Dynamic Class Cards */}
        <div className="grid grid-cols-3 gap-10 items-stretch overflow-hidden max-sm:grid-cols-1">
  {classes.length === 0 && (
    <div className="text-gray-400 text-lg">No classes found.</div>
  )}
  {classes.map((cls, i) => (
    <div
      key={cls.id || i}
      className="relative bg-[#21293a] h-[350px] w-full pt-10 pb-6 px-8 text-center flex flex-col items-center justify-between rounded-2xl shadow-lg transition-all duration-300
        hover:shadow-[0_0_24px_8px_rgba(0,180,255,0.38)] hover:border-[2px] hover:border-[#00b4ff] border border-[#28324a]"
      style={{ cursor: "default" }} // Only button is clickable now
    >
      <div className="w-full">
        <p className="text-2xl font-bold text-[#0ecaff] mb-1">
          {cls.name}
        </p>
        <p className="px-2 font text-base max-xl:px-2 text-gray-200 overflow-y-auto h-40 mt-0">
          {cls.description || "No description available."}
        </p>
        <button
          className="mt-4 py-2 px-6 bg-[#0ecaff] text-white font-semibold rounded-lg shadow transition-all duration-300
            hover:bg-[#21293a] hover:text-[#0ecaff] hover:shadow-[0_0_16px_4px_rgba(0,180,255,0.52)] border border-[#0ecaff] hover:border-[#fff]"
          onClick={e => {
            e.stopPropagation();
            navigate(`/classes/${cls.name.replace(/\s+/g, '-').toLowerCase()}`);
          }}
          type="button"
        >
          Click Me
        </button>
      </div>
    </div>
  ))}
</div>



      </div>
    </section>
  );
};

export default Profile;
