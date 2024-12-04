import React from "react";
import Image from "next/image";

interface MovieDetailsProps {
  movieData: any;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movieData }) => {
  return (
    <div style={{ display: "flex", gap: "20px", backgroundColor: "#a3b18a", borderRadius: "10px", padding: "20px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}>
      <div>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
          alt={movieData.title}
          width={300}
          height={450}
          style={{ borderRadius: "10px" }}
        />
      </div>
      <div style={{ flex: 1, color: "#344e41" }}>
        <h2>{movieData.title}</h2>
        <p><strong>Overview:</strong> {movieData.overview}</p>
        <p><strong>Genre:</strong> {movieData.genres.map((genre: any) => genre.name).join(", ")}</p>
        <p><strong>Release Date:</strong> {movieData.release_date}</p>
        <p><strong>Rating:</strong> {movieData.vote_average} / 10</p>
      </div>
    </div>
  );
};
