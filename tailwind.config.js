/** @type {import('tailwindcss').Config} */
import tailwindForm from '@tailwindcss/forms';
export default {
  content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
  theme: {},
  plugins: [
    tailwindForm({
      strategy: 'class',
    }),
  ],
  darkMode: 'class',
};
