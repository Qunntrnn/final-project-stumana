export const AppPagination = ({
  itemsPerPage,
  pageIndex,
  total,
  setPageIndex,
}) => {
  const lastPageIndex = Math.ceil(total / itemsPerPage) - 1;
  const totalPage = lastPageIndex === -1 ? 1 : lastPageIndex + 1;
  return (
    <div aria-label="Page navigation example">
      <div className="inline-flex -space-x-px text-sm">
        <span
          className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          disabled={pageIndex === 0}
          onClick={() => setPageIndex(pageIndex - 1)}
        >
          Prev
        </span>
        <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
          Page {pageIndex + 1}/{totalPage}
        </span>
        <span
          className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          disabled={pageIndex === lastPageIndex || lastPageIndex === -1}
          onClick={() => setPageIndex(pageIndex + 1)}
        >
          Next
        </span>
        <span className="text-sm text-gray-700 dark:text-gray-400">
          Total:{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            {total}
          </span>{" "}
          items
        </span>
      </div>
    </div>
  );
};
