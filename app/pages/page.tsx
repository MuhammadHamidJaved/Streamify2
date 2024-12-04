// apikey = 94423c85c9367525fa4fc765186c06ca
// read access token = eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NDQyM2M4NWM5MzY3NTI1ZmE0ZmM3NjUxODZjMDZjYSIsIm5iZiI6MTcyNzQxMzgwOS42NjQzMjUsInN1YiI6IjY2ZjYzYzk0NmM5YTY4MTU1MDcwYWI3YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FXGHRpW50jIRz8_YRqhdspZE1u6kJOQEo8QPP0AxtgQ

//api = https://api.themoviedb.org/3/movie/550?api_key=94423c85c9367525fa4fc765186c06ca
// type script syntax
'use client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Link from 'next/link';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import CustomPagination from '../../components/CustomPagination/CustomPagination';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

const Movies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const getMovies = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/top_rated?api_key=94423c85c9367525fa4fc765186c06ca&language=en-US&page=${page}`
      )
      .then((response) => {
        setMovies(response.data.results);
        setTotalPages(response.data.total_pages);
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  };

  const addToWatchlist = async (movieId: number) => {
    try {
      const profileId = JSON.parse(localStorage.getItem('selectedProfileId') || '{}');

      if (!profileId) {
        console.error('Profile ID not found in local storage');
        return;
      }

     const response= await axiosInstance.post(`/profiles/${profileId}/add_to_watchlist/`, {
        tmdb_movie_id: movieId,
      });

      console.log('Movie added to watchlist:', response.data);
    } catch (error) {
      console.error('Error adding movie to watchlist:', error);
      
    }
  };

  useEffect(() => {
    getMovies();
  }, [page]);

  return (
    <div>
      {/* Movie Cards */}
      <Container className="p-5">
        <Row>
          {movies.map((movie: Movie, index: number) => (
            <Col
              key={index}
              xs={8}
              sm={6}
              md={4}
              lg={3}
              className="mb-4 m-auto"
            >
              <Card style={{ width: '100%', position: 'relative' }}>
                {/* 3-dots menu */}
                <Dropdown style={{ position: 'absolute', top: '10px', right: '10px' }}>
                  <Dropdown.Toggle
                    variant="secondary"
                    size="sm"
                    id={`dropdown-${movie.id}`}
                  >
                    •••
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => addToWatchlist(movie.id)}>
                      Add to Watchlist
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                {/* Movie Poster */}
                <Link href={`/pages/player/${movie.id}`}>
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    style={{ objectFit: 'cover' }}
                  />
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Pagination */}
      <div className="w-100 d-flex justify-content-center">
        <CustomPagination page={page} totalPages={totalPages} setPage={setPage} />
      </div>
    </div>
  );
};

export default Movies;
