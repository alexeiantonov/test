module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: true
    }
  },
  preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  setupFiles: []
};
