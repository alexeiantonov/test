module.exports = {
  mode: 'jit',
  purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  darkMode: false,
  theme: {
    container: {
      center: true
    }
  },
  variants: {
    extend: {}
  }
};
