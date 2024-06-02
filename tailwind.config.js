
import {nextui} from "@nextui-org/react";
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
     screens:{
      '2xsm':'360px',
      'xsm' :'390px',
      'ssm' :'412px',
      'xmd' :'500px',
      '2xmd':'624px',
      '3xl' :'1920px',
      '4xl' :'2560px',
     },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#0093AB",
        secondary: "#006778",
        primaryDark: "#006778",
        primaryDark2: "#06324b",
        primaryLight: "#00AFC1",
        primaryYellow: "#FFD124",
        bgGray: '#F0F0F0',
        bgLoginSignup: '#EAFDFF',
        equipmentRentalGrayBg:'#F8F7F7',
        equipmentRentalGrayText: '#565656',
        darkBg: '#0F172A',
        hsvgbg: '#F0F0F0'
        
      },
    },
  },
  
  plugins: [require("daisyui")],
  plugins: [nextui()],
};
