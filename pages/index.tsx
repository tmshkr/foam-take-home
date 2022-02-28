import type { NextPage } from "next";
import Head from "next/head";

import { getImagesQuery } from "src/lib/queries";
import CategoryFilters from "src/components/CategoryFilters";
import Pagination from "src/components/Pagination";
import { Buttons } from "src/components/Buttons";

const region = process.env.NEXT_PUBLIC_MY_AWS_REGION;
const bucket = process.env.NEXT_PUBLIC_MY_AWS_BUCKET;

export type ImageItem = { key: string; is_foaming: boolean | null };

const Home: NextPage<{
  data: [ImageItem];
  total: number;
}> = ({ data, total }) => {
  return (
    <>
      <Head>
        <title>Is It Foaming?</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <CategoryFilters />

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {data.map((item) => (
              <div key={item.key} className="group relative">
                <div className="w-full min-h-80 bg-gray-200 rounded-md overflow-hidden">
                  <a
                    href={`https://${bucket}.s3.${region}.amazonaws.com/${item.key}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={`https://${bucket}.s3.${region}.amazonaws.com/${item.key}`}
                      className="hover:opacity-75 w-full h-full object-center object-cover lg:w-full lg:h-full"
                    />
                  </a>
                </div>

                <Buttons key={item.key} item={item} />
              </div>
            ))}
          </div>
          <Pagination total={total} />
        </div>
      </main>
    </>
  );
};

export default Home;
export const getServerSideProps = getImagesQuery;
