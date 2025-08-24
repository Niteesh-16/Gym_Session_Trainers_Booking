import React from "react";
import { useNavigate } from "react-router-dom";

const aboutSections = [
  {
    icon: "🌟",
    title: "Our Philosophy",
    desc: "We are dedicated to a holistic approach to fitness, combining expert training, mindful movement, and nutritional support to help you achieve sustainable results—physically and mentally. Every service we offer is designed to help you push your limits, develop healthy habits, and enjoy the journey.",
  },
  {
    icon: "💪",
    title: "Personal Training",
    desc: "Our certified personal trainers work with you one-on-one to create a customized fitness plan tailored to your goals, abilities, and lifestyle. Whether you're a beginner or an athlete, our trainers provide the motivation, accountability, and expertise you need to succeed.",
  },
  {
    icon: "🧘‍♂️",
    title: "Yoga & Mindful Movement",
    desc: "We offer a variety of yoga sessions and mindful movement classes led by experienced instructors. These sessions are designed to improve flexibility, reduce stress, and help you develop a deeper mind-body connection—an essential part of balanced fitness.",
  },
  {
    icon: "🥗",
    title: "Nutritional Guidance",
    desc: "Our nutrition experts provide personalized dietary consultations and meal tracking support. We help you understand how to fuel your body for energy, recovery, and overall health—so you can see better results from your training and feel your best every day.",
  },
  {
    icon: "🤝",
    title: "Community & Support",
    desc: "At Explosive Fitness, you're never alone. Our supportive community, group classes, and friendly staff create an environment where everyone feels welcome and motivated. We celebrate every milestone with you and encourage you to keep moving forward.",
  },
  {
    icon: "🏋️‍♂️",
    title: "Advanced Equipment",
    desc: "Train with the latest, state-of-the-art gym equipment designed for safety, versatility, and performance. Our facility is constantly updated to offer you the best tools for every aspect of your workout.",
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <section
      id='services'
      className='pt-24 w-full min-h-screen bg-gallery-pattern8 bg-cover bg-fixed max-lg:bg-center max-sm:bg-center flex items-center justify-center'
      
    >
      <div className="w-full max-w-6xl flex flex-col items-center text-center">
        <p className="mt-10 text-primary text-3xl font-semibold mb-8 tracking-wide">
          ABOUT EXPLOSIVE FITNESS
        </p>

        <h1 className="mb-10 text-6xl leading-tight font-extrabold text-white max-xl:text-5xl max-sm:text-3xl">
          More Than a Gym—A Complete Wellness Destination
        </h1>

        <p className="text-2xl text-gray-300 mb-16">
          At Explosive Fitness, we believe true transformation is about more than just exercise—it's about empowering you with the tools, guidance, and support to thrive in every aspect of your wellness journey.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 w-full mb-12">
          {aboutSections.map((section, idx) => (
            <div
              key={section.title}
              className="relative bg-[#1a1f2c] border border-primary rounded-2xl shadow-xl p-10 flex flex-col items-center text-center group transition-all duration-300 hover:shadow-[0_8px_32px_0_rgba(0,217,255,0.25)] hover:-translate-y-2"
              style={{
                background: "linear-gradient(135deg, #1a1f2c 80%, #00d9ff18 100%)",
              }}
            >
              <div className="text-5xl mb-4 drop-shadow-lg">{section.icon}</div>
              <h2 className="text-2xl font-bold text-primary mb-3">{section.title}</h2>
              <p className="text-lg text-gray-300">{section.desc}</p>
              <span className="pointer-events-none absolute inset-0 rounded-2xl group-hover:shadow-[0_0_32px_4px_rgba(0,217,255,0.06)] transition-all duration-300"></span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/registration")}
          className="mt-6 py-5 px-12 text-xl font-semibold text-white bg-primary rounded-lg shadow-lg hover:bg-primary hover:[box-shadow:0_0_12px_2px_rgba(0,217,255,0.25)] transition"
        >
          JOIN THE EXPLOSIVE FITNESS FAMILY
        </button>
      </div>
    </section>
  );
};

export default About;

