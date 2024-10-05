module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  coverageDirectory: 'docs/coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['node_modules', 'src/log.ts'],
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
