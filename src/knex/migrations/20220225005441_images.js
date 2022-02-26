exports.up = async function (knex) {
  await knex.schema.createTable("images", (table) => {
    table.string("key").primary();
    table.boolean("is_foaming");
  });
};

exports.down = async function (knex) {
  await knex.raw("DROP TABLE images");
};
