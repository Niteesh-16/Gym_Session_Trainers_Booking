import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import TeamMembers from '../Components/TeamMembers'
import TimeSchedule from '../Components/TimeSchedule'

const serviceData = [
  {
    label: 'Meet Our Trainers',
    desc: 'Explore certified and experienced trainers to guide your journey.',
    icon: '🏋️‍♂️',
    btnDec: 'View Team',
    btnIcon: '→',
    action: 'team'
  },
  {
    label: 'View Time Schedule',
    desc: 'Check available time slots to book your training sessions.',
    icon: '📅',
    btnDec: 'Check Now',
    btnIcon: '→',
    action: 'schedule'
  },
  {
    label: 'One-on-One Consultation',
    desc: 'Get expert advice to tailor your fitness and wellness plans.',
    icon: '🧠',
    btnDec: 'Start Now',
    btnIcon: '→',
    action: 'contact' // Navigate to contact-us page
  }
]

const Services = () => {
  const [visibleSection, setVisibleSection] = useState(null)
  const teamRef = useRef(null)
  const scheduleRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (visibleSection === 'team' && teamRef.current) {
      teamRef.current.scrollIntoView({ behavior: 'smooth' })
    }
    if (visibleSection === 'schedule' && scheduleRef.current) {
      scheduleRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [visibleSection])

  return (
    <section
      id='services'
      className='w-full min-h-screen bg-service-pattern bg-cover bg-fixed max-lg:bg-center max-sm:bg-center'
    >
      <div className='max-container padding-hero-y padding-x'>
        {/* Header */}
        <div className='flex justify-between items-end mb-28 max-lg:flex-col max-lg:items-start max-lg:gap-5 max-sm:mb-20'>
          <div>
            <p className='text-primary relative before:absolute before:w-20 before:h-1 before:bg-primary before:top-[50%] before:left-0 pl-24 text-2xl before:translate-y-[-50%]'>
              OUR SERVICES FOR YOU
            </p>
            <div className='text-6xl text-white mt-8 leading-[60px] max-w-[65%] font-semibold max-xl:text-4xl max-lg:text-5xl max-lg:leading-[60px] max-lg:max-w-[100%] max-sm:text-3xl'>
              <h1>PUSH YOUR LIMITS FORWARD WE OFFER TO YOU</h1>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className='grid grid-cols-3 cursor-pointer gap-10 place-items-center overflow-hidden max-lg:grid-cols-2 max-sm:grid-cols-1'>
          {serviceData.map((val, index) => (
            <div
              key={`${val.label}-${index}`}
              onClick={() => {
                if (val.action === 'contact') {
                  navigate('/contact-us')
                } else if (val.action) {
                  setVisibleSection(val.action)
                }
              }}
              className='relative group bg-white min-h-[350px] pt-20 pb-9 text-center flex flex-col items-center justify-center max-xl:pt-16 rounded-xl shadow-md'
            >
              <div>
                <p className='group-hover:text-primary flex justify-center mb-10 text-5xl'>
                  {val.icon}
                </p>
                <p className='text-2xl mb-5 font-semibold'>{val.label}</p>
                <p className='px-12 font text-lg pb-16 max-xl:px-5 text-gray-700'>
                  {val.desc}
                </p>
              </div>
              <button className='absolute -bottom-16 opacity-0 group-hover:bottom-0 group-hover:opacity-[1] duration-300 left-0 w-full flex justify-center items-center gap-3 py-5 bg-primary text-white text-lg text-center'>
                {val.btnDec} {val.btnIcon}
              </button>
            </div>
          ))}
        </div>

        {/* Conditional Sections with Refs for scrolling */}
        <div ref={teamRef}>
          {visibleSection === 'team' && (
            <div className='mt-24 transition-all duration-500'>
              <TeamMembers />
            </div>
          )}
        </div>

        <div ref={scheduleRef}>
          {visibleSection === 'schedule' && (
            <div className='mt-24 transition-all duration-500'>
              <TimeSchedule />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Services
