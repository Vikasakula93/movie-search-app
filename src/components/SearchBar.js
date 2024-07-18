import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().length === 0) {
      setError('Please enter a movie name');
      return;
    }
    if (query.trim().length < 3) {
      setError('Search term should be at least 3 characters');
      return;
    }
    onSearch(query.trim());
    setQuery('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a movie..."
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary">Search</button>
      </div>
      {error && <p className="text-danger mt-2">{error}</p>}
    </form>
  );
};

export default SearchBar;
