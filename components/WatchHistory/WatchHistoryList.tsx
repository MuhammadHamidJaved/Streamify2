'use client';
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import MovieCard from './MovieCard';
import { Movie } from '@/types/Movie';
import axios from 'axios';
// import { useMovieDetails } from '@/hooks/useMovieDetails';

interface WatchHistoryListProps {
  movies: Movie[];
  removeFromWatchHistory: (movieId: number) => void;
}

const WatchHistoryList: React.FC<WatchHistoryListProps> = ({ movies, removeFromWatchHistory }) => {
  

  return (
    <Row>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <Col key={movie.tmdb_movie_id} xs={12} sm={6} md={4} lg={3}>
            <MovieCard
              movie={movie}
             
              removeFromWatchHistory={() => removeFromWatchHistory(movie.tmdb_movie_id)}
            />
          </Col>
        ))
      ) : (
        <h3 className="text-center">No movies in watch history</h3>
      )}
    </Row>
  );
};

export default WatchHistoryList;
