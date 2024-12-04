'use client';

import React from 'react';
import { Genre } from '@/types/Genre';
import { fetchGenres } from '@/services/tmdbApi';
import { Container, Row, Col, Card } from 'react-bootstrap';
import '@/styles/GenreSection.css';
import Link from 'next/link';

const GenrePage: React.FC = () => {
  const [genres, setGenres] = React.useState<Genre[]>([]);

  React.useEffect(() => {
    const getGenres = async () => {
      const genresData = await fetchGenres();
      setGenres(genresData);
    };
    getGenres();
  }, []);

  return (
    <Container className="py-5">
      <h1 className="text-center mb-4">Genres</h1>
      <Row className="gy-4">
        {genres.map((genre) => (
          <Col key={genre.id} xs={12} sm={6} md={4} lg={3}>
            <Link href={`/pages/genre/${genre.id}`} className='text-decoration-none'>
              <Card className="text-center shadow-sm genre-card">
                <Card.Body>
                  <Card.Title className="mb-0">{genre.name}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default GenrePage;
