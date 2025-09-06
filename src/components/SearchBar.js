import React from 'react';

function SearchBar({ setSearchTerm }) {
  return (
    <input
      placeholder="Search widgets..."
      onChange={(e) => setSearchTerm(e.target.value)}
      style={{ marginBottom: '20px', width: '300px' }}
    />
  );
}

export default SearchBar;
