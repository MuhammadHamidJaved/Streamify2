'use client';

import React, { useState, useEffect } from 'react';
import { fetchGenres } from '@/services/tmdbApi';
import { Genre } from '@/types/Genre';
import { Form, Row, Col, Container, Button } from 'react-bootstrap';

interface SearchFiltersProps {
  onFilterChange: (filters: { genre: string; year: string; rating: string; query: string }) => void;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({ genre: '', year: '', rating: '', query: '' });
  const [genres, setGenres] = useState<Genre[]>([]);

  useEffect(() => {
    const getGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    getGenres();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const handleSearch = () => {
    onFilterChange(filters); // Trigger the search when the user clicks the button
  };

  return (
    <Container className="d-flex flex-column align-items-center">
      <Form className="mb-4 w-100" style={{ maxWidth: '600px' }}>
        <Row className="gy-3">
          {/* Query Search */}
          <Col xs={12}>
            <Form.Group>
              <Form.Label>Search by Keyword</Form.Label>
              <Form.Control
                type="text"
                name="query"
                value={filters.query}
                onChange={handleInputChange}
                placeholder="Enter a movie title or keyword"
              />
            </Form.Group>
          </Col>

          {/* Genre Filter */}
          <Col xs={12} md={4}>
            <Form.Group>
              <Form.Label>Genre</Form.Label>
              <Form.Select name="genre" value={filters.genre} onChange={handleInputChange}>
                <option value="">Any Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Year Filter */}
          <Col xs={12} md={4}>
            <Form.Group>
              <Form.Label>Year</Form.Label>
              <Form.Select name="year" value={filters.year} onChange={handleInputChange}>
                <option value="">Any Year</option>
                {Array.from({ length: 50 }, (_, i) => (
                  <option key={i} value={2024 - i}>
                    {2024 - i}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* Rating Filter */}
          <Col xs={12} md={4}>
            <Form.Group>
              <Form.Label>Rating</Form.Label>
              <Form.Select name="rating" value={filters.rating} onChange={handleInputChange}>
                <option value="">Any Rating</option>
                <option value="8">8+ Stars</option>
                <option value="7">7+ Stars</option>
                <option value="6">6+ Stars</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Search Button */}
        <div className="d-flex justify-content-center mt-3">
          <Button variant="primary" onClick={handleSearch}>
            Search
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default SearchFilters;
