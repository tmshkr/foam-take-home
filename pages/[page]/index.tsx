import type { NextPage } from "next";
import { useRouter } from "next/router";

const QueryPage: NextPage = () => {
  const router = useRouter();
  const { page, filters } = router.query;
  console.log(router.query);

  return <div>{page}</div>;
};

export default QueryPage;
