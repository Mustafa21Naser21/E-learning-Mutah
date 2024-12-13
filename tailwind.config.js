/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      colors:{
        header: '#3D506D',
        greenYellow:' #A3BB10',
        green:'#2A8934',
        darkBlue:'#2657A1',
        purple:'#802378',
        red:'#FF0000',
        teal:'#52B9AC',
        footer:'#263449',
        copy:'#232933',
        form:'#686868',
        input:'#C0C0C0',
        move:'#956386',
        orange:'#C0694D'

      },
    },
  },
  plugins: [],
}

