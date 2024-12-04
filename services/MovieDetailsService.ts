import axios from 'axios';
import { Movie } from '@/types/Movie';

export class MovieDetailsService {
  static async fetchDetails(movieId: number) {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    return response.data;
  }

  static async fetchAllDetails(movies: Movie[]) {
    const detailsPromises = movies.map((movie) => this.fetchDetails(movie.tmdb_movie_id));
    const detailsArray = await Promise.all(detailsPromises);

    return detailsArray.reduce((acc, detail) => {
      acc[detail.id] = detail;
      return acc;
    }, {} as Record<number, any>);
  }
}
