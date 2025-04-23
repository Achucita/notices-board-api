module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.js'],
  setupFilesAfterEnv: ['./tests/setup.js'],
  globalSetup: './tests/setup.js',
  globalTeardown: './tests/teardown.js',
  testTimeout: 10000 // Aumenta el timeout si es necesario
};
