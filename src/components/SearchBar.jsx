import React, { useState } from 'react';

const SearchBar = ({ placeholder, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleInput = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    // If we want to search as the user types
    onSearch(value);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch} className="search-form">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder={placeholder || "Search..."}
            value={searchTerm}
            onChange={handleInput}
          />
          <div className="input-group-append">
            <button
              className="btn"
              type="submit"
              style={{
                backgroundColor: '#fd5c28',
                color: 'white',
                borderColor: '#fd5c28'
              }}
            >
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
