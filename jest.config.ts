import type { Config } from 'jest';

 const config: Config = {
  verbose: true, 
  testEnvironment: 'node', 
  rootDir: './',
  testMatch: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
  transform: {
    '^.+\\.ts?$': 'ts-jest', 
  },
  moduleFileExtensions: ['ts', 'js', 'json', 'node'], 
};

export default config;


