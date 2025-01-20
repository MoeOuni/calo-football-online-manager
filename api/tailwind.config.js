/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ['./src/**/*.{html,js,ejs}'],
  theme: {
    extend: {},
  },
  plugins: [
    {
      tailwindcss: {},
      autoprefixer: {},
    },
  ],
};
