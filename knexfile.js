module.exports = {
  development: {
    client: "sqlite3",
    useNullAsDefault: true,
    connection: {
      filename: "./knex/data/data.db3",
    },
    migrations: {
      directory: "./knex/migrations",
    },
    seeds: {
      directory: "./knex/seeds",
    },
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./knex/migrations",
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./knex/seeds",
    },
  },
};
