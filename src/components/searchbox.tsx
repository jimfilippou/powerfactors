import React, { useState, useCallback } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className="text-gray-400"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M21 21l-6 -6" />
  </svg>
);

export const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = "Search...",
  className = "",
  defaultValue = "",
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(event.target.value);
    },
    []
  );

  const handleKeyPress = useCallback(
    (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        onSearch(inputValue);
      }
    },
    [inputValue, onSearch]
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      onSearch(inputValue);
    },
    [inputValue, onSearch]
  );

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <SearchIcon />
      </div>
      <input
        autoFocus
        type="search"
        value={inputValue}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className={`pl-10 rounded-md border border-gray-300 px-3 py-2 text-sm w-[13.1rem]
          focus:outline-none focus:ring-2 focus:ring-blue-500
          ${className}`}
        aria-label="Search"
      />
    </form>
  );
};
