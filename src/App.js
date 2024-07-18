import React, { useState, useEffect } from 'react';
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
  const [sortOption, setSortOption] = useState('title'); 

  useEffect(() => {
    handleSearch('');
  }, []); 

  const handleSearch = async (query) => {
    setLoading(true);
    setError('');
    try {
      const newMovies = await fetchMovies(query);
      setMovies(newMovies);
    } catch (err) {
      setError('Failed to fetch movies');
    }
    setLoading(false);
  };

  const handleSort = (option) => {
    if (option === sortOption) return; 

    setSortOption(option);

  
    const sortedMovies = [...movies].sort((a, b) => {
      if (option === 'title') {
        return a.title.localeCompare(b.title);
      } else if (option === 'year') {
        return a.first_publish_year - b.first_publish_year;
      }
      return 0;
    });

    setMovies(sortedMovies);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="bg-dark py-3">
        <div className="container">
          <h1 className="text-white text-center">Movie Search</h1>
          <SearchBar onSearch={handleSearch} />
          <div className="text-center mt-3">
            <button className="btn btn-secondary me-2" onClick={() => handleSort('title')}>Sort by Title</button>
            <button className="btn btn-secondary" onClick={() => handleSort('year')}>Sort by Year</button>
          </div>
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
