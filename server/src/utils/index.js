export const configuration = Object.freeze({
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || 'SOME-DUMMY-SECRET',
  db: process.env.db || 'mongodb://localhost:27017/test',
  ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN || '7d',
});
