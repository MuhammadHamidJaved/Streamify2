'use client';

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard';
import { Movie } from '@/services/tmdbApi';
import CustomPagination from '@/components/CustomPagination/CustomPagination';
import { useParams } from 'next/navigation';

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const { category} = useParams();
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const getMovies = () => {
    axios
      .get(`https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=${page}`)
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.log(error);
        setError('An error occurred. Category can be wrong.');
      });
  };

  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <div className="container my-4">
      <h1 className="text-center mb-4">{
        category === 'popular' ? 'Popular' : category === 'top_rated' ? 'Top Rated' : category === 'upcoming' ? 'Upcoming' : category === 'now_playing' ? 'Now Playing' : 'Category not found'
        } Movies</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className='d-flex flex-wrap justify-content-center gap-4'>

        {movies.map((movie) => (
          <div key={movie.id} >
            <MovieCard movie={movie} />
          </div>
        ))}
        <CustomPagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
      
    </div>
  );
};

export default Movies;
