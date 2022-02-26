import knex from "../../knex";

import QueryPage from "../index";

export default QueryPage;

export async function getServerSideProps(context) {
  console.log(context.query);
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
  console.log(count);

  const offset = (page - 1) * 8;

  const data = await knex("images")
    .select("*")
    .where(queryBuilder)
    .limit(8)
    .offset(offset);

  return {
    props: { data },
  };
}
