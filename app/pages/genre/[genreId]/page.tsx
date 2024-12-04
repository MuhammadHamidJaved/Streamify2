'use client';
import React, { useState, useEffect } from 'react';
import { fetchMoviesByGenre, Movie } from '@/services/tmdbApi';
import GenreSection from '@/components/ContentCategories/GenreSection';
import Pagination from '@/components/CustomPagination/CustomPagination';
import '@/styles/Movie.css'

interface GenreMoviesProps {
  params: { genreId: string, genreName: string }; 
}

const GenreMovies: React.FC<GenreMoviesProps> = ({ params }) => {
  const { genreId, genreName } = params;   
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1); 

  useEffect(() => {
    
    const loadMovies = async () => {
      if (genreId) {
        try {
          const fetchedMovies = await fetchMoviesByGenre(Number(genreId), page);
          setMovies(fetchedMovies);
          console.log(fetchedMovies);
          const total = Math.ceil(400 / 20); 
          setTotalPages(total);
        } catch (error) {
          console.error('Failed to fetch movies:', error);
        }
      }
    };

    loadMovies();
  }, [genreId, page]); 

  return (
    <div className="movies-page">
      <h1>Movies in Genre {genreId}</h1>
      {movies.length > 0 ? (
        <>
          <GenreSection movies={movies} />
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        </>
      ) : (
        <p>Loading movies...</p>
      )}
    </div>
  );
};

export default GenreMovies;
