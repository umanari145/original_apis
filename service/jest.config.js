module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/tests', '<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/**/*.d.ts',
    '!src/server.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
  testTimeout: 10000,
  verbose: true,
  // テストより前に1回だけ実行（DB接続、マイグレーション等）
  globalSetup: '<rootDir>/tests/setup.ts',
  // テストより後に1回だけ実行（DB切断等）
  globalTeardown: '<rootDir>/tests/teardown.ts',
  // 各テストファイル実行前に読み込まれる（beforeEach等の共通処理）
  setupFilesAfterEnv: ['<rootDir>/tests/jest.setup.ts'],  
  testMatch: ['<rootDir>/tests/**/*.test.ts'],
};
