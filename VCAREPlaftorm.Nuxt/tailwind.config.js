/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        // VazirRegular: 'Vazir-Regular-FD',
        // DanaRegular: 'Dana-Regular',
      },
      colors: {
        "brand-blue": "#002664",
        "brand-blue-dark": "#001434",
        "brand-blue-light": "#2766C5",

        "color-green": "#345C64",
        "color-body": "#FCF3E8",
        "color-neu": "#808080",
        "color-neu-dark": "#375C63",
        "color-aux": "#2DB284",
        "color-pri": "#2B99AF",
        "color-yellow": "#FAE889",
        "color-com": "#F7785C",
        "color-sec": "#FCB660",
      },
    },
  },
  plugins: [],
};
