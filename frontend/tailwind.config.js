/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      //       colors: {
      //    primary: "#00d9ff",    // Neon Cyan (used for border, headings, etc.)
      //   secondary: "#00bcd4",  // Lighter Cyan (used for hover effects)
      //   dark: "#000000",          // Black Background
      //   light: "#FFFFFF",         // White Text
      //   subtle: "#D1D5DB",        // Gray-300 for descriptions
      // },
      colors: {
        primary: "#00d9ff",    // Neon Cyan (new primary)
        secondary: "#E900FF",  // Violet (new secondary)
        dark: "#000000",       // Black Background
        light: "#FFFFFF",      // White Text
        subtle: "#D1D5DB",     // Gray-300 for descriptions
      },

      backgroundImage:{
        'hero-pattern': "linear-gradient(to right bottom, rgba(0, 0, 0, 3.0), rgba(43, 108, 176, 0.10)), url('assets/img-6.jpg')"
,

        'service-pattern':
        "linear-gradient(to right bottom, rgba(0, 0, 0, 0.9), rgba(43, 108, 176, 0.9)), url('assets/img-5.jpg')",

        'gallery-pattern1':"linear-gradient(to right bottom, rgba(0,0,0,0.2), rgba(0,0,0,1.0)), url('assets/img-18.jpg')",

        'gallery-pattern2':"url('assets/img-14.jpg')",

       'gallery-pattern3': "linear-gradient(to right bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('assets/img-19.jpg')",


        'gallery-pattern4':"url('assets/img-16.jpg')",

        'gallery-pattern5':"url('assets/img-17.jpg')",
        'gallery-pattern6':"url('assets/img-15.jpg')",
        'gallery-pattern7':"url('assets/img-7.jpg')",
        'gallery-pattern8':"linear-gradient(to right bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0.8)), url('assets/img-17.jpg')",



        'footer-pattern':
        "linear-gradient(to right bottom, rgba(0, 0, 0, .8), rgba(0, 0, 0, 0.8)), url('assets/img-7.jpg')",

      },
    },
  },
  plugins: [],
}
