import "dotenv/config";

const {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME_DEV,
  DB_NAME_DEV_DIALECT,
  DB_NAME_TEST,
  DB_NAME_TEST_DIALECT,
  DB_NAME_PROD,
  DB_NAME_PROD_DIALECT
} = process.env;

export const config = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_DEV,
    host: DB_HOST,
    dialect: DB_NAME_DEV_DIALECT
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_TEST,
    host: DB_HOST,
    dialect: DB_NAME_TEST_DIALECT
  },
  production: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME_PROD,
    host: DB_HOST,
    dialect: DB_NAME_PROD_DIALECT
  }
}
