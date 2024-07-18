import React from 'react';
import { fetchRandomDogImage } from '../api';

class MovieCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dogImage: '',
      imageLoading: true,
      error: ''
    };
  }

  componentDidMount() {
    this.getDogImage();
  }

  async getDogImage() {
    try {
      const image = await fetchRandomDogImage();
      this.setState({ dogImage: image, imageLoading: false });
    } catch (error) {
      console.error('Failed to fetch dog image:', error);
      this.setState({ error: 'Failed to load image', imageLoading: false });
    }
  }

  render() {
    const { movie } = this.props;
    const { dogImage, imageLoading, error } = this.state;

    return (
      <div className="card border-dark shadow">
        {imageLoading ? (
          <div className="text-center py-5">
            <p className="text-muted mb-0">Loading image...</p>
          </div>
        ) : error ? (
          <div className="text-center py-5">
            <p className="text-danger mb-0">{error}</p>
          </div>
        ) : (
          <img
            src={dogImage}
            className="card-img-top"
            alt="Random Dog"
            style={{ height: '300px', objectFit: 'cover' }} 
          />
        )}
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
  }
}

export default MovieCard;
