import { useState, useEffect } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';
import { Movie } from '@/types/Movie';
import '@/styles/watchHistory.css';

export const useWatchHistory = () => {
  const [movies, setMovies] = useState<Movie[]>([]);


  const fetchWatchHistory = async () => {
    try {
      const profileId = JSON.parse(localStorage.getItem('selectedProfileId') || '{}');
      if (!profileId) {
        console.error('Profile ID not found in local storage');
        return;
      }
      const response = await axiosInstance.get(`/profiles/${profileId}/get_watch_history`);
      setMovies(response.data);
      console.log('Watch History:', response.data);
    //   setTotalPages(response.data.total_pages);
    } catch (error) {
      console.error('Error fetching watch history:', error);
    }
  };

  const removeFromWatchHistory = async (movieId: number) => {
    try {
      const profileId = JSON.parse(localStorage.getItem('selectedProfileId') || '{}');
      if (!profileId) {
        console.error('Profile ID not found in local storage');
        return;
      }
      await axiosInstance.post(`/profiles/${profileId}/remove_from_watch_history/`, { tmdb_movie_id: movieId });
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.tmdb_movie_id !== movieId));
    } catch (error) {
      console.error('Error removing movie from watch history:', error);
    }
  };

  useEffect(() => {
    fetchWatchHistory();
  }, []);

  return { movies, removeFromWatchHistory };
};
