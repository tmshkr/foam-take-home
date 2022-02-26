import { useRouter } from "next/router";
import Link from "next/link";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/solid";

export default function Example({ total }) {
  const router = useRouter();
  const page = Number(router.query.page) || 1;
  const filter =
    router.query.filter?.replace(/\s/g, "+") ||
    "foaming+not_foaming+uncategorized";
  const totalPages = Math.ceil(total / 8);

  const currentPageClasses =
    "border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium";
  const notCurrentPageClasses =
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium";

  const PageLink = ({ currentPage, pageNumber }) => {
    const classes =
      currentPage === pageNumber ? currentPageClasses : notCurrentPageClasses;
    return (
      <Link href={`/${pageNumber}?filter=${filter}`}>
        <a className={classes} aria-current="page">
          {pageNumber}
        </a>
      </Link>
    );
  };

  const pageLinks = [];
  let start = Math.max(page - 2, 1);
  let end = Math.min(page + 2, totalPages);

  while (end - start < 4 && (start > 1 || end < totalPages)) {
    start = Math.max(start - 1, 1);
    end = Math.min(end + 1, totalPages);
  }

  for (let i = start; i <= end; i++) {
    pageLinks.push(<PageLink key={i} currentPage={page} pageNumber={i} />);
  }

  return (
    <nav className="border-t border-gray-200 px-4 mt-8 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        {page !== 1 && (
          <Link href={`/${page - 1}?filter=${filter}`}>
            <a className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              <ArrowNarrowLeftIcon
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Previous
            </a>
          </Link>
        )}
      </div>
      <div className="hidden sm:block">{pageLinks}</div>
      <div className="-mt-px w-0 flex-1 flex justify-end">
        {page !== totalPages && (
          <Link href={`/${page + 1}?filter=${filter}`}>
            <a className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Next
              <ArrowNarrowRightIcon
                className="ml-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
}
