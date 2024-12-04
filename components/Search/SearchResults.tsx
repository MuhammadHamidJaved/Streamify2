'use client';

import React from 'react';
import MovieCard from '../MovieCard';
interface SearchResultsProps {
  results: any[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  if (!results || results.length === 0) {
    return <h3>No results found.</h3>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-center gap-4 mt-5 mb-5">
      {results.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default SearchResults;
