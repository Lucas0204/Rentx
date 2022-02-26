import { pathsToModuleNameMapper } from 'ts-jest/utils';
import { compilerOptions } from './tsconfig.json';

export default {
  bail: true,
  clearMocks: true,
  restoreMocks: true,
//   collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "text-summary",
    "lcov"
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },

  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: "<rootDir>/src/"
  }),

  preset: "ts-jest",
  testMatch: ["**/*.spec.ts"],
  collectCoverageFrom: [
    "<rootDir>/src/modules/**/useCases/**/*.ts"
  ],
};
