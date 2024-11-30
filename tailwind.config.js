/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{css,xml,html,vue,svelte,ts,tsx}'
  ],
  darkMode: ['class', '.ns-dark'],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false
  }
}
