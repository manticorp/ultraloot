export default {
  transform: {
    '^.+\\.ts?$': ['ts-jest', { tsconfig: { module: 'CommonJS', moduleResolution: 'node10', ignoreDeprecations: '6.0', types: ['node', 'jest'] } }]
  },
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  coveragePathIgnorePatterns: ['node_modules', 'src/log.ts'],
  testRegex: '/tests/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'node']
};
