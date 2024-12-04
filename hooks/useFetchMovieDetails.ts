import { useState, useEffect } from 'react';
import { Movie } from '@/types/Movie';
import { MovieDetails } from '@/types/Movie';
import { MovieDetailsService } from '@/services/MovieDetailsService';

export const useFetchMovieDetails = (movies: Movie[]) => {
  const [movieDetails, setMovieDetails] = useState<Record<number, MovieDetails>>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (movies && movies.length === 0) {
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      setLoading(true);
      const details = await MovieDetailsService.fetchAllDetails(movies);
      setMovieDetails(details);
      setLoading(false);
    };

    fetchDetails();
  }, [movies]);

  return { movieDetails, loading };
};
