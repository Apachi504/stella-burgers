import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest', // Трансформация TypeScript
    },
    testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'], // Паттерн для поиска тестов
};

export default config;