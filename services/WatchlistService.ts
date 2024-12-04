import axiosInstance from '@/app/utils/axiosInstance';
import { Movie } from '@/types/Movie';

export class WatchlistService {
  static async fetchWatchlist(profileId: number) {
    // console.log('Fetching watchlist for profile:', profileId);
    const response = await axiosInstance.get(`/profiles/${profileId}/get_watchlist`);
    // console.log('Watchlist:', response.data);
    return response.data;
  }

  static async removeMovieFromWatchlist(profileId: number, movieId: number) {
    return await axiosInstance.post(`/profiles/${profileId}/remove_from_watchlist/`, {
      tmdb_movie_id: movieId,
    });
  }

  static async addToWatchlist(profileId: number, movieId: number) {

     return await axiosInstance.post(`/profiles/${profileId}/add_to_watchlist/`, {
        tmdb_movie_id: movieId,
      });

  }
}
