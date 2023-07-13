// eslint-disable-next-line node/no-unpublished-import
import type {JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.ts',
    '!./test/**/*',
    '!./**/*.d.ts',
    '!./integration/**/*',
  ],
  coverageDirectory: './reports/coverage',
  coverageThreshold: {
    './src/openapi/**/*.ts': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.(spec|test).ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
};

export default config;
