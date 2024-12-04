'use client';

import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Movie } from '@/types/Movie';
import { WatchlistService } from '@/services/WatchlistService';
import WatchlistCard from './WatchlistCard';
// import WatchlistPagination from './WatchlistPagination';
import { useFetchMovieDetails } from '@/hooks/useFetchMovieDetails';

const Watchlist: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
//   const [page, setPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(0);
  const profileId = JSON.parse(localStorage.getItem('selectedProfileId') || '{}');

  if (!profileId) {
    console.error('Profile ID not found in local storage');
    
  }

  const { movieDetails, loading } = useFetchMovieDetails(movies);

  const fetchWatchlist = async () => {
   
    const data = await WatchlistService.fetchWatchlist(profileId);
    setMovies(data);
    
  };

  const removeFromWatchlist = async (movieId: number) => {
    await WatchlistService.removeMovieFromWatchlist(profileId, movieId);
    setMovies((prev) => prev.filter((movie) => movie.tmdb_movie_id !== movieId));
  };

  useEffect(() => {
    fetchWatchlist();
  }, []);

  return (
    <Container className="p-5">
      <h2 className="text-center mb-4">Watchlist</h2>
      <Row>
        {loading ? (
          <h3 className="text-center">Loading movies...</h3>
        ) : movies && movies.length > 0 ? (
          movies.map((movie) => (
            <Col key={movie.tmdb_movie_id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <WatchlistCard
                movieId={movie.tmdb_movie_id}
                details={movieDetails[movie.tmdb_movie_id]}
                onRemove={() => removeFromWatchlist(movie.tmdb_movie_id)}
              />
            </Col>
          ))
        ) : (
          <h3 className="text-center">No movies in watchlist</h3>
        )}
      </Row>
      {/* <WatchlistPagination page={page} totalPages={totalPages} onPageChange={setPage} /> */}
    </Container>
  );
};

export default Watchlist;
