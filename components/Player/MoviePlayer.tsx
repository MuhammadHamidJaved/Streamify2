import React from "react";


interface MoviePlayerProps {
  id: string;
  player: string;
}


const MoviePlayer: React.FC<MoviePlayerProps> = ({ id, player }) => {
  return (
    <div className="iframe-wrapper">
      <iframe
        src={
          player === "vidsrc"
            ? `https://vidsrc.pro/embed/movie/${id}`
            : `https://multiembed.mov/?video_id=${id}&tmdb=1`
        }
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export{ MoviePlayer};
