import React from 'react'
import { teamMembers } from '../Data/Data'

import { BiLogoFacebook } from "react-icons/bi"
import { BsTwitter, BsInstagram } from "react-icons/bs"
import { FaGlobe } from "react-icons/fa6"

const TeamMembers = () => {
  return (
    <section id="team" className="w-full min-h-screen bg-service-pattern bg-cover bg-fixed">
      <div className="max-container padding-hero-y padding-x">
        {/* Header */}
        <div className="flex justify-between items-end mb-28 max-md:flex-col max-md:items-start max-md:gap-5 max-md:mb-20">
          <div>
            <p className="text-primary relative before:absolute before:w-20 before:h-1 before:bg-primary before:top-[50%] before:left-0 pl-24 text-2xl before:translate-y-[-50%]">
              OUR TEAM MEMBERS
            </p>
            <div className="text-6xl text-white mt-8 leading-[60px] font-semibold max-sm:text-3xl">
              <h1>OUR MOST EXPERIENCED</h1>
              <h1>TRAINERS</h1>
            </div>
          </div>

          <div>
            <button className="py-4 px-9 text-xl group relative text-white bg-primary rounded-sm">
              <div className="buttonDiv"></div>
              <span className="buttonSpan">MORE SERVICES</span>
            </button>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-3 gap-10 max-lg:grid-cols-2 max-lg:gap-5 max-sm:grid-cols-1">
          {teamMembers.map((val) => (
            <div key={val.name} className="group relative overflow-hidden rounded-xl shadow-md">
              <img
                src={val.img}
                alt="TeamMember"
                className="h-full object-cover w-full max-sm:h-[65vh]"
              />

              <div className="absolute bottom-[-50px] duration-[.4s] group-hover:bottom-0 left-0 w-full group-hover:bg-primary p-7 pb-8">
                <p className="font mb-2 text-gray-300 relative before:absolute before:w-10 before:h-1 before:bg-primary before:top-[50%] before:left-0 pl-14 text-lg before:translate-y-[-50%] group-hover:text-white group-hover:before:bg-white">
                  {val.role}
                </p>
                <h1 className="font text-xl font-semibold text-white">{val.name}</h1>

                <div className="flex items-center gap-6 text-lg mt-[27px] text-white">
                  <BiLogoFacebook />
                  <BsTwitter />
                  <FaGlobe />
                  <BsInstagram />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TeamMembers
