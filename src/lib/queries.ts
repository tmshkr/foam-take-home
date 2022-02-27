import knex from "src/knex";

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

  let count: any = await knex("images").count().where(queryBuilder);
  if (process.env.NODE_ENV === "development") [{ "count(*)": count }] = count;
  else [{ count }] = count;

  const totalPages = Math.ceil(count / 8);
  if (page > totalPages) {
    return {
      redirect: {
        destination: `/${totalPages}?filter=${
          filter?.replace(/\s/g, "+") || "foaming+not_foaming+uncategorized"
        }`,
        permanent: false,
      },
    };
  }

  const data = await knex("images")
    .select("*")
    .where(queryBuilder)
    .limit(8)
    .offset((page - 1) * 8)
    .orderBy("key", "asc");

  return {
    props: { data, total: count },
  };
}
