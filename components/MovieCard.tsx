// components/MovieCard.tsx
import Link from "next/link";
import "@/styles/GenreSection.css";
import { WatchlistService } from "@/services/WatchlistService";
import { Dropdown } from "react-bootstrap";

interface MovieCardProps {
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    release_date: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  const handleAdd = async () => {
    try {
      const profileId = JSON.parse(
        localStorage.getItem("selectedProfileId") || "{}"
      );
      if (!profileId) {
        alert("Select a profile to add to watchlist");
        console.error("Profile ID not found in local storage");
        return;
      }

      await WatchlistService.addToWatchlist(profileId, movie.id);
    } catch (error) {
      console.error("Error adding movie to watchlist:", error);
    }
  };
  return (
    <div className="movie-card">
      <Dropdown style={{ position: "absolute", top: "10px", right: "10px" }}>
        <Dropdown.Toggle
          variant="secondary"
          size="sm"
          id={`dropdown-${movie.id}`}
        >
          •••
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handleAdd()}>
            Add to Watchlist
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Link
        className="text-decoration-none "
        href={`/pages/player/${movie.id}`}
      >
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      </Link>
      <div className="movie-info">
        <h6 className="movie-title">{movie.title}</h6>
        <p className="movie-release-date">
          {new Date(movie.release_date).getFullYear()}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
