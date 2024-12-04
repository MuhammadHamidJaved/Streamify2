'use client';
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { MovieDetails } from '@/components/Movie/MovieDetails'
import { PlayerControls } from '@/components/Player/PlayerControls'
import { MoviePlayer } from '@/components/Player/MoviePlayer'
import { CommentsSection } from '@/components/Movie/CommentsSection'
import  {
   fetchMovieDetails
} from '@/services/apiService'
import axiosInstance from "@/app/utils/axiosInstance";
import axios from "axios";
import '@/styles/player.css'

const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

const Player: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movieData, setMovieData] = useState<any>(null);
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [player, setPlayer] = useState<string>("vidsrc");

  useEffect(() => {
    const fetchMovie = async () => {
      if (id) {
        const data = await fetchMovieDetails(id, TMDB_API_KEY);
        setMovieData(data);
      } else {
        console.error("Movie ID is undefined");
      }
    };
    fetchMovie();
  }, [id]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent((prevTime) => prevTime + 1); // Increment time every minute (60000 ms)
    }, 60000); // Runs every minute

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeSpent >= 3 && movieData) {
      const addToWatchHistory = async () => {
        try {
          const profileId = JSON.parse(localStorage.getItem("selectedProfileId") || "{}");
          if (!profileId) {
            console.error("Profile ID not found");
            return;
          }
          const response= await axiosInstance.post(`/profiles/${profileId}/add_to_watch_history/`, {
            tmdb_movie_id: id,
          });
          
          console.log('Movie added to watch history:', response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert(error.response.data?.error || "Failed to add movie to watch history.");
          console.error("Error adding movie to watch history:", error.response);
        } else {
          alert("Failed to add movie to watch history.");
          console.error("Error adding movie to watch history:", error);
        }
      }
    }

      addToWatchHistory();
    }
  }, [timeSpent, movieData]);

  if (!movieData) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ backgroundColor: "#dad7cd", minHeight: "100vh", padding: "20px", fontFamily: "'Poppins', sans-serif" }}>
      <MoviePlayer id={id} player={player} />
      <PlayerControls setPlayer={setPlayer} />
      <MovieDetails movieData={movieData} />
      <CommentsSection movieData={movieData} />
    </div>
  );
};

export default Player;

