import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        input: "0 -2px 4px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.5)", // Top and bottom shadow
      },
    },
  },
  plugins: [daisyui],
};
