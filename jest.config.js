module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^vscode$': '<rootDir>/src/test/mock-vscode.js', 
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json', 
    },
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', 
  },
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], 
};