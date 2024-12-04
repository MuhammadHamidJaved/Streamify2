'use client';

import React, { useState, useEffect } from 'react';
import SearchFilters from '@/components/Search/SearchFilters';
import CustomPagination from '@/components/CustomPagination/CustomPagination';
import { fetchMovies } from '@/services/tmdbApi'; // Replace with your actual movie fetching service
import { Row, Col, Card, Container } from 'react-bootstrap';


interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const AdvancedSearch: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [filters, setFilters] = useState<{ genre: string; year: string; rating: string; query: string }>({
    genre: '',
    year: '',
    rating: '',
    query: '',
  });
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchFilteredMovies = async () => {
    try {
      const response = await fetchMovies({
        genre: filters.genre,
        year: filters.year,
        rating: filters.rating,
        query: filters.query,
        page,
      }); // Ensure your API supports query, genre, year, and rating parameters
      setMovies(response.results);
      setTotalPages(response.total_pages);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchFilteredMovies();
  }, [filters, page]);

  const handleFilterChange = (updatedFilters: typeof filters) => {
    setFilters(updatedFilters);
    setPage(1); // Reset to the first page when filters change
  };

  return (
    <Container>
      <h1 className="text-center mt-4">Advanced Search</h1>
      <SearchFilters onFilterChange={handleFilterChange} />

      <Row className="gy-4">
        {movies.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4} lg={3}>
            <Card>
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt={movie.title}
              />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-center mt-4">
        <CustomPagination page={page} setPage={setPage} totalPages={totalPages} />
      </div>
    </Container>
  );
};

export default AdvancedSearch;
