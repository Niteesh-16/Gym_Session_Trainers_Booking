import React from 'react'

const Contact = () => {
  return (
    <section
      id='contact'
      className='w-full h-screen bg-gallery-pattern3 bg-cover bg-fixed max-lg:bg-center max-sm:bg-center flex items-center justify-center'
    >
      <div className='max-w-5xl w-full text-white px-4'>

        {/* Header */}
        <div className='mb-6'>
          <p className='text-primary relative before:absolute before:w-20 before:h-1 before:bg-primary before:top-[50%] before:left-0 pl-24 text-2xl before:translate-y-[-50%]'>
            CONTACT US
          </p>
        </div>

        <h1 className='text-4xl md:text-5xl font-bold mb-4 leading-tight text-center'>
          REACH OUT AND LET’S CONNECT
        </h1>

        {/* Motivational Text */}
        <p className='text-lg italic font-semibold text-gray-300 mb-6 max-w-[700px] mx-auto text-center'>
          Whether you have a question about our training programs, schedule, or need a personal consultation — <br />
          <span className='text-white font-bold'>we’re here to guide you, support you, and push you past your limits.</span> <br />
          <span className='text-primary font-bold'>Let’s build a stronger you — together!</span>
        </p>

        {/* Contact Info */}
        <div className='text-lg space-y-2 text-center'>
          <div>
            📞 <span className='font-bold'>Phone:</span> +91 98765 43210
          </div>
          <div className='flex justify-center items-center gap-2'>
            <img
              src='https://img.icons8.com/color/48/000000/whatsapp--v1.png'
              alt='WhatsApp'
              className='w-5 h-5'
            />
            <span>+91 98765 43210</span>
          </div>
          <div>
            📧 <span className='font-bold'>Email:</span> fitzone@example.com
          </div>
        </div>

      </div>
    </section>
  )
}

export default Contact
