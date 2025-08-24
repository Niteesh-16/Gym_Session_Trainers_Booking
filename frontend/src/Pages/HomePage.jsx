import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <section
      id='services'
      className='w-full min-h-screen bg-hero-pattern bg-cover bg-fixed max-lg:bg-center max-sm:bg-center flex items-center justify-center'
      
    >
      
      

      {/* Centered Hero Section */}
      <div className="max-w-3xl w-full flex flex-col items-center text-center">
        {/* <h1 className="text-6xl font-bold mb-6 leading-tight max-md:text-4xl">
          <span className="text-white">Your Fitness Journey</span> <br /> <span className="text-white">Starts{" "}
          <span className="text-white">Today</span>
          </span>
        </h1> */}
        <h1 className="text-6xl font-bold mb-6 leading-tight max-md:text-4xl text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
  Your Fitness Journey <br /> Starts <span className="text-white">Today</span>
</h1>


        <p className="text-lg text-gray-300 mb-8">
          Join Explosive Fitness and transform yourself with the guidance of certified trainers, personalized plans, and state-of-the-art equipment.
        </p>

        <div className="flex gap-6 justify-center">
          <button
            onClick={() => navigate("/registration")}
            className="bg-[#00d9ff] text-white px-8 py-3 rounded-xl text-lg font-bold shadow-sm hover:[box-shadow:0_0_12px_2px_rgba(0,217,255,0.25)] hover:bg-[#00bcd4] transition"
          >
            Join Now
          </button>
          <button
            onClick={() =>
              document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })
            }
            className="border-2 border-[#00d9ff] text-[#00d9ff] px-8 py-3 rounded-xl text-lg font-semibold hover:bg-[#00d9ff]/10 transition"
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;

