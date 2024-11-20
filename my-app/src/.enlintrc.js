   // .eslintrc.js
   module.exports = {
    env: {
      browser: true,
      es2021: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
    ],
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: 'module',
    },
    plugins: [
      'react',
    ],
    rules: {
      // 여기에 추가적인 규칙을 정의할 수 있습니다.
    },
    globals: {
      gapi: 'readonly', // gapi를 전역 변수로 설정
    },
  };