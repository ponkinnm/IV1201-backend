import type {Config} from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'js'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    extensionsToTreatAsEsm: ['.ts'],
};

export default config;