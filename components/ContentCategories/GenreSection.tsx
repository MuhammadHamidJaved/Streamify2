import React, { useRef } from 'react';
import { Movie } from '@/services/tmdbApi';
import Link from 'next/link';
import '@/styles/GenreSection.css';
import MovieCard from '../MovieCard';

interface GenreSectionProps {
  movies: Movie[];
}

const GenreSection: React.FC<GenreSectionProps> = ({ movies }) => {
  const rowRef = useRef<HTMLDivElement>(null);
  


  const scrollLeft = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: -300, behavior: 'smooth' }); // Scroll left by 300px
    }
  };

  const scrollRight = () => {
    if (rowRef.current) {
      rowRef.current.scrollBy({ left: 300, behavior: 'smooth' }); // Scroll right by 300px
    }
  };

  return (
    <div className="genre-section">
      <button className="scroll-arrow left-arrow" onClick={scrollLeft}>
        &larr;
      </button>
      <div className="movies-row" ref={rowRef}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <MovieCard movie={movie} />
          </div>
          
        ))}
      </div>
      <button className="scroll-arrow right-arrow" onClick={scrollRight}>
        &rarr;
      </button>
    </div>
  );
};

export default GenreSection;
