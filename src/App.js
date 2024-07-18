// src/App.js
import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import { fetchMovies } from './api';
import { ClipLoader } from 'react-spinners';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (query) => {
    if (!query) {
      setError('Please enter a movie name');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Fetch new movies based on the query
      const newMovies = await fetchMovies(query);
      // Set the new movies and clear previous results
      setMovies(newMovies);
    } catch (err) {
      setError('Failed to fetch movies');
    }
    setLoading(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="bg-dark py-3">
        <div className="container">
          <h1 className="text-white text-center">Movie Search</h1>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      <div className="flex-grow-1 bg-light">
        <div className="container py-4">
          {loading && <ClipLoader size={60} color={"#333"} loading={loading} className="my-4 mx-auto d-block" />}
          {error && <p className="text-danger text-center">{error}</p>}
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {movies.map((movie, index) => (
              <div key={index} className="col">
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;


