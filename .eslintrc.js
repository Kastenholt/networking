module.exports = {
  extends: ['airbnb'],
  rules: {
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
      },
    ],
    quotes: [
      'error',
      'single',
    ],
    'import/no-import-module-exports': 0,
    'no-console': ['warn', {
      allow: [
        'warn',
        'error',
        'info',
      ],
    }],
  },
};