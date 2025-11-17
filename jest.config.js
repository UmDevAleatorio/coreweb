const nextJest = require('next/jest');
const { pathsToModuleNameMapper } = require('ts-jest');
const tsconfig = require('./tsconfig.json');

const createJestConfig = nextJest({
  // Aponta para a raiz do seu app Next.js
  dir: './',
});

/** @type {import('jest').Config} */
const customJestConfig = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  
  // Lê automaticamente os aliases do seu tsconfig.json
  // Isso conserta o erro '@/' que tivemos antes
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),

  // Informa ao Jest onde encontrar os arquivos de teste
  // (Mantive seu padrão antigo e adicionei o novo)
  testMatch: [
    '**/test/**/*.test.(ts|tsx)',
    '**/src/test/**/*.test.(ts|tsx)',
  ],

  // Não precisamos mais de 'transform' ou 'preset' aqui,
  // o 'next/jest' cuida disso para nós.
};

// createJestConfig é uma função async
module.exports = createJestConfig(customJestConfig);