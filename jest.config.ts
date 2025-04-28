import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jsdom",
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^@/hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^@/store/(.*)$": "<rootDir>/src/store/$1",
    "^@/styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/config/(.*)$": "<rootDir>/src/config/$1",
    "^@/assets/(.*)$": "<rootDir>/src/assets/$1",
    "^@/types/(.*)$": "<rootDir>/types/$1",
    "^@/app/(.*)$": "<rootDir>/app/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
};

export default createJestConfig(customJestConfig);
