module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure Tailwind scans all your component files
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")], // Include DaisyUI plugin
};
