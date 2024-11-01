import { useState, useMemo } from "react";
import { SearchBox } from "./searchbox";

interface TableToolbarProps {
  totalPages: number;
}

function TableToolbar({ totalPages = 1 }: TableToolbarProps) {
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const [pageSize] = useState(searchParams.get("pageSize") || "50");
  const currentPage = parseInt(searchParams.get("page") || "1");

  const allowedPageSizes = [10, 20, 50, 100, 200, 500];

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", newPage.toString());
    window.location.search = params.toString();
  };

  const handlePageSizeChange = (newSize: string) => {
    const params = new URLSearchParams(window.location.search);
    params.set("pageSize", newSize);
    params.set("page", "1");
    window.location.search = params.toString();
  };

  const handleSearch = (query: string, field: "character" | "tv") => {
    const params = new URLSearchParams(window.location.search);
    params.set("q", query);
    params.set("page", "1");
    params.set("field", field);
    window.location.search = params.toString();
  };

  const clearAllFilters = () => (window.location.href = window.location.origin);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <div className="flex justify-center items-center gap-x-3 mt-8 max-w-[80rem]">
      <button
        onClick={clearAllFilters}
        className="px-3 py-2 border rounded transition-colors duration-200 hover:bg-gray-50 active:bg-gray-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M3.06 13a9 9 0 1 0 .49 -4.087" />
          <path d="M3 4.001v5h5" />
          <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
        </svg>
      </button>
      <select
        onChange={(e) => handlePageSizeChange(e.target.value)}
        value={pageSize}
        className="rounded border p-2 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Select page size"
      >
        {allowedPageSizes.map((size) => (
          <option key={size} value={size}>
            {size} per page
          </option>
        ))}
      </select>

      <span className="text-gray-500">|</span>

      <SearchBox
        onSearch={(term) => handleSearch(term, "character")}
        placeholder="Search for a character..."
        defaultValue={searchParams.get("field") === "character" ? searchParams.get("q")! : ""}
      />

      <span className="text-gray-500">or</span>

      <SearchBox
        onSearch={(term) => handleSearch(term, "tv")}
        placeholder="Search for a tv show..."
        defaultValue={searchParams.get("field") === "tv" ? searchParams.get("q")! : ""}
      />

      <span className="text-gray-500">|</span>

      <button
        onClick={() => handlePageChange(1)}
        disabled={isFirstPage}
        className={`px-3 py-1 border rounded transition-colors duration-200 ${
          isFirstPage ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-50 active:bg-gray-100"
        }`}
        aria-label="First page"
      >
        1
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={`px-3  py-1 border rounded transition-colors duration-200 ${
          isFirstPage ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-50 active:bg-gray-100"
        }`}
        aria-label="Previous page"
      >
        &larr;
      </button>

      <span className="text-gray-700 w-28 text-center">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        className={`px-3 py-1 border rounded transition-colors duration-200 ${
          isLastPage ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-50 active:bg-gray-100"
        }`}
        aria-label="Next page"
      >
        &rarr;
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={isLastPage}
        className={`px-3 min-w-14 py-1 border rounded transition-colors duration-200 ${
          isLastPage ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "hover:bg-gray-50 active:bg-gray-100"
        }`}
        aria-label="Last page"
      >
        {totalPages}
      </button>
    </div>
  );
}

export default TableToolbar;
