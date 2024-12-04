import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import CommentFeed from "@/components/Feed/CommentFeed";

interface CommentsSectionProps {
  movieData: any;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ movieData }) => {
  const [userRating, setUserRating] = useState<number>(0);

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  return (
    <div style={{ backgroundColor: "#344e41", padding: "20px", borderRadius: "10px", color: "#dad7cd", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", margin: "20px" }}>
      <h3>Rate this Movie</h3>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <FaStar
            key={star}
            size={24}
            color={star <= userRating ? "#588157" : "#ccc"}
            onClick={() => handleRating(star)}
            style={{ cursor: "pointer", marginRight: "5px" }}
          />
        ))}
      </div>
      <CommentFeed id={movieData.id.toString()} type="movie" />
    </div>
  );
};
