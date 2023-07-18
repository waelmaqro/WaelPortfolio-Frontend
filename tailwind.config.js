/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/flowbite-react/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        light: "#F6F8F8",
        brown: "#A08A7C",
        blue:"#959DCA",
        faintblue: "#847C88",
        navy: "#313B44"
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    
    fontFamily: {
      DM: ['DM Serif Display', 'serif'],
      Jost: ['Jost', 'sans-serif'],
    },

    screens: {
      xxxs: "280px",
      xxs: "380px",
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1020px",
      lg: "1200px",
      xlg: "1300px",
      xxl: "1700px", 
    },

   
  },
  plugins: [],
}
