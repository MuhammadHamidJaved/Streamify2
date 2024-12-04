import React, { useEffect, useState } from "react";
import axios from "axios";
import PostForm from "./PostForm";
import PostList from "./PostList";
import useWebSocket from "@/hooks/useWebSocket";
import { Post } from "@/types/Post";
import { WebSocketMessage } from "@/types/WebSocketMessage";

const PostFeed: React.FC = () => {
  const { messages, sendMessage } = useWebSocket<WebSocketMessage>("ws://localhost:8001/ws/posts/");
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<Post[]>("http://localhost:8000/posts/");
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1] as unknown as Post;
      if (newMessage.id) {
        setPosts((prevPosts) => {
          if (!prevPosts.some((post) => post.id === newMessage.id)) {
            return [newMessage, ...prevPosts];
          }
          return prevPosts;
        });
      }
    }
  }, [messages]);

  const handlePostSubmit = (message: WebSocketMessage) => {
    sendMessage(message);
  };

  return (
    <div>
      <PostForm onPostSubmit={handlePostSubmit} />
      <PostList posts={posts} />
    </div>
  );
};

export default PostFeed;
