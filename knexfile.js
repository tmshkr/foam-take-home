module.exports = {
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
};
