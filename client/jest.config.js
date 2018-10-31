module.exports = {
  preset: 'jest-preset-angular',
  roots: [],
  testRegex: '\\.spec\\.ts$',
  setupTestFrameworkScriptFile: '<rootDir>/src/setupJest.ts',
  transfromIgnorePatterns: ['node_modules/(?!@ngrx|@ionic-native|@ionic)']
};
