import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./src/openapi/**/*',
    '!./test/**/*',
    '!./**/*.d.ts',
    '!./integration/**/*',
  ],
  coverageDirectory: './reports/coverage',
  roots: [
    '<rootDir>/test',
  ],
  testMatch: [
    "**/*\.(spec|test)\.ts"
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
};

export default config;
