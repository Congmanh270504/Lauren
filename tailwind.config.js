/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // adjust to your folders
        "./components/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            // your custom theme here
        },
    },
    plugins: [
        require('tailwindcss-motion'),
    ],
  };
