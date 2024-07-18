// src/components/MovieCard.js
import React, { useState, useEffect } from 'react';
import { fetchRandomDogImage } from '../api';

const MovieCard = ({ movie }) => {
  const [dogImage, setDogImage] = useState('');

  useEffect(() => {
    const getDogImage = async () => {
      const image = await fetchRandomDogImage();
      setDogImage(image);
    };
    getDogImage();
  }, []);

  return (
    <div className="card border-dark shadow">
      <img src={dogImage} className="card-img-top" alt="Random Dog" />
      <div className="card-body">
        <h5 className="card-title text-primary mb-3">{movie.title}</h5>
        {movie.author_name && (
          <p className="card-text text-secondary mb-1">
            <strong>Authors:</strong> {movie.author_name.join(', ')}
          </p>
        )}
        {movie.first_publish_year && (
          <p className="card-text text-secondary mb-0">
            <strong>Year:</strong> {movie.first_publish_year}
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieCard;
