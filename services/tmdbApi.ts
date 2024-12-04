// src/api/tmdbApi.ts
import axios from 'axios';

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

export interface Genre {
  id: number;
  name: string;
}

export const fetchGenres = async (): Promise<Genre[]> => {
  const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`);
  console.log(response
  );
  return response.data.genres;
};

export const fetchMoviesByGenre = async (genreId: number, page: number = 1): Promise<Movie[]> => {
  const response = await axios.get(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genreId}`
  );
  return response.data.results;
};

export const fetchAllGenreMovies = async (): Promise<{ [key: number]: Movie[] }> => {
  const genres = await fetchGenres();
  const moviesByGenre: { [key: number]: Movie[] } = {};

  for (const genre of genres) {
    const movies = await fetchMoviesByGenre(genre.id, 1); // Fetch the first page for each genre
    moviesByGenre[genre.id] = movies;
  }

  return moviesByGenre;
};





const API_BASE_URL = 'https://api.themoviedb.org/3';
export const fetchMoviesByFilters = async (filters: { genre: string; year: string; rating: string }, page: number) => {
  const { genre, year, rating } = filters;

  const response = await axios.get(`${API_BASE_URL}/discover/movie`, {
    params: {
      api_key: API_KEY,
      with_genres: genre || undefined,
      primary_release_year: year || undefined,
      'vote_average.gte': rating || undefined,
      page,
    },
  });

  return {
    results: response.data.results,
    total_pages: response.data.total_pages,
  };
};


interface FetchMoviesFilters {
  genre?: string;
  year?: string;
  rating?: string;
  query?: string;
  page?: number;
}

export const fetchMovies = async (filters: FetchMoviesFilters) => {
  const { genre, year, rating, query, page = 1 } = filters;

  // Construct the parameters dynamically
  const params: Record<string, string | number> = {
    api_key: API_KEY!,
    page,
  };

  if (genre) params.with_genres = genre; // Filter by Genre
  if (year) params.primary_release_year = year; // Filter by Release Year
  if (rating) params['vote_average.gte'] = rating; // Filter by Minimum Rating
  if (query) params.query = query; // Search by Query

  const endpoint = query ? '/search/movie' : '/discover/movie'; // Use the appropriate endpoint

  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, { params });

    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw new Error('Failed to fetch movies');
  }
};