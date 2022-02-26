import knex from "../knex";

export async function getImagesQuery(context) {
  const { filter, page = 1 } = context.query;
  const filters = filter
    ? filter.split(" ")
    : ["foaming", "not_foaming", "uncategorized"];

  const queryBuilder = (builder) => {
    if (filters.includes("foaming")) builder.orWhere({ is_foaming: true });
    if (filters.includes("not_foaming")) builder.orWhere({ is_foaming: false });
    if (filters.includes("uncategorized")) builder.orWhereNull("is_foaming");
  };

  const count = await knex("images")
    .count()
    .where(queryBuilder)
    .then(([{ "count(*)": count }]) => Number(count));

  const data = await knex("images")
    .select("*")
    .where(queryBuilder)
    .limit(8)
    .offset((page - 1) * 8);

  return {
    props: { data, total: count },
  };
}
