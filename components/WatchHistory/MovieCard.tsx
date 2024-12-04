import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Link from 'next/link';
import { Movie, MovieDetails } from '@/types/Movie';
import axios from 'axios';

interface MovieCardProps {
  movie: Movie;
//   details?: MovieDetails;
  removeFromWatchHistory: (movieId: number) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, removeFromWatchHistory }) => {
  const { tmdb_movie_id } = movie;
  const [movieDetails, setMovieDetails] = React.useState<{ [key: number]: MovieDetails }>({});



    const fetchMovieDetails = async (movieId:number) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
            );
            setMovieDetails((prevDetails) => ({
                ...prevDetails,
                [movieId]: response.data as MovieDetails,
            }));
        } catch (error) {
            console.error('Error fetching movie details:', error);
        }
    };

    React.useEffect(() => {
        fetchMovieDetails(tmdb_movie_id);
    }, [tmdb_movie_id]);



  React.useEffect(() => {
    console.log('MovieCard mounted', movie, movieDetails);
  }, [movie]);

  return (
    <Card style={{ width: '100%' }}>
      <Link href={`/pages/player/${tmdb_movie_id}`}>
        <Card.Img
          variant="top"
          src={`https://image.tmdb.org/t/p/w500/${movieDetails[tmdb_movie_id]?.poster_path}`}
          alt={movieDetails[tmdb_movie_id]?.title}
          style={{ objectFit: 'cover' }}
        />
      </Link>
      <Card.Body className="text-center">
        <Button variant="danger" onClick={() => removeFromWatchHistory(tmdb_movie_id)}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
};

export default MovieCard;
