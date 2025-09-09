// src/components/SearchBar.tsx
import React from 'react';

const SearchBar = () => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search for a salon or location..."
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-deep-green focus:border-transparent"
      />
    </div>
  );
};

export default SearchBar;