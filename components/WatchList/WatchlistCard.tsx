'use client';

import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { MovieDetails } from '@/types/Movie';

interface WatchlistCardProps {
  movieId: number;
  details: MovieDetails;
  onRemove: () => void;
}

const WatchlistCard: React.FC<WatchlistCardProps> = ({ movieId, details, onRemove }) => {
  return (
    <Card style={{ width: '100%' }}>
      <Link href={`/pages/player/${movieId}`}>
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`}
          title={details?.title || 'Loading...'}
          style={{ objectFit: 'cover' }}
        />
      </Link>
      <Card.Body className="text-center">
        <Button variant="danger" onClick={onRemove}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
};

export default WatchlistCard;
