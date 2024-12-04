


import React from "react";
import { Post } from "@/types/Post";
import DisplayPostStatus from "./DisplayPostStatus";
import CommentFeed from "./CommentFeed";

// Define PostItemProps interface
interface PostItemProps {
  post: Post;
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <div
      style={{
        backgroundColor: "#dad7cd", // light background color
        borderRadius: "8px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
      }}
      className="post-item"
    >
      

      {post.media_url && (
        <img
          src={post.media_url}
          alt="Post media"
          style={{
            width: "70%",
            margin: "0 auto",
            height: "auto",
            display: "block",
            borderRadius: "8px",
            marginBottom: "15px",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        />
      )}

<h3
        style={{
          color: "#3a5a40", // dark green color for title
          fontSize: "1.6rem",
          marginBottom: "10px",
          fontWeight: "600",
        }}
      >
        {post.content}
      </h3>

      <p
        style={{
          fontSize: "0.9rem",
          color: "#588157", // green color for text
          marginBottom: "15px",
          fontStyle: "italic",
        }}
      >
        Posted on: {new Date(post.created_at).toLocaleString()}
      </p>

      <DisplayPostStatus post_Id={post.id} />
      <CommentFeed id={post.id.toString()} type="post" />

      {/* Add hover effect for the post container */}
      <style jsx>{`
        .post-item:hover {
          background-color: #a3b18a;
          box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

export default PostItem;
