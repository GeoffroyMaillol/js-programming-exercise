import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom', // for React components
  moduleNameMapper: {
    // Handle CSS imports
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    // Handle absolute imports like "@/components/..."
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default config;