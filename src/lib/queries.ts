import knex from "src/knex";

export async function getImagesQuery(context) {
  const { filter } = context.query;
  const filters = filter ? filter.split(" ") : [];
  const page = Number(context.query.page);

  if (!page) {
    return {
      redirect: {
        destination: `/1?filter=${filter?.replace(/\s/g, "+") || ""}`,
        permanent: false,
      },
    };
  }

  const queryBuilder = (builder) => {
    if (filters.includes("foaming")) builder.orWhere({ is_foaming: true });
    if (filters.includes("not_foaming")) builder.orWhere({ is_foaming: false });
    if (filters.includes("uncategorized")) builder.orWhereNull("is_foaming");
  };

  let count: any = await knex("images").count().where(queryBuilder);
  if (process.env.NODE_ENV === "development") [{ "count(*)": count }] = count;
  else [{ count }] = count;

  const totalPages = Math.ceil(count / 8) || 1;
  if (page > totalPages) {
    return {
      redirect: {
        destination: `/${totalPages}?filter=${
          filter?.replace(/\s/g, "+") || ""
        }`,
        permanent: false,
      },
    };
  }

  if (count < 1) {
    return {
      props: { data: [], count: 0 },
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
