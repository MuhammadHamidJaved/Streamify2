{/* <p>Likes: {post.likes_count}</p>
              <button onClick={() => handleLikeDislike(post.id, "like")}>Like</button>
              <p>Dislikes: {post.dislikes_count}</p>
              <button onClick={() => handleLikeDislike(post.id, "dislike")}>Dislike</button> */}




import React, { useState,useEffect } from 'react';
import useWebSocket from '../../hooks/useWebSocket';
import axios from 'axios';
import { storeTokens } from '../../app/utils/authHelpers';
import { 
    FaThumbsUp,
    FaThumbsDown
 } from 'react-icons/fa';
import { Button, Col, Row } from 'react-bootstrap';



interface WebSocketMessage {
    type: "new_post" | "like" | "dislike";
    content?: string; // For post creation
    id?: number; // For like/dislike
    action?: "create" |"like" | "dislike"; // Action type for like/dislike
    media?: string; // Base64-encoded media for post creation
    access_token: string;
    likes_count?: number;
    dislikes_count?: number;
  }



const DisplayPostStatus = ({post_Id}: {post_Id: number}) => {
    const { messages, sendMessage } = useWebSocket<WebSocketMessage>("ws://localhost:8001/ws/posts/");
    const [likes, setLikes] = useState<number>(0);
    const [dislikes, setDislikes] = useState<number>(0);


    useEffect(() => {
        // Fetch existing likes and dislikes from the server
        const fetchLikesDislikes = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/posts/${post_Id}/`);
                setLikes(response.data.likes_count);
                setDislikes(response.data.dislikes_count);
            } catch (error) {
                console.error("Error fetching likes and dislikes:", error);
            }
        };

        fetchLikesDislikes();
    }, []);


    useEffect(() => {
        if(messages.length > 0) {
            const newMessage = messages[messages.length - 1] as WebSocketMessage;
            console.log("New message received:", newMessage);

            if (newMessage.id === post_Id) {
            
                
                setLikes(():any=>newMessage.likes_count);
                setDislikes(():any=>newMessage.dislikes_count);
         
            }
           
            
        }

    }, [messages]);


    const refreshAccessToken = async (): Promise<string | null> => {
        try {
          const refreshToken = localStorage.getItem("refreshToken");
          if (!refreshToken) {
            alert("You must be logged in to perform this action.");
            return null;
          }
    
          const response = await axios.post("http://localhost:8000/token/refresh/", {
            refresh: refreshToken,
          });
    
          const newAccessToken = response.data.access;
          const newRefreshToken = response.data.refresh;
          storeTokens(newAccessToken, newRefreshToken);
          console.log("Access token refreshed.");
          return newAccessToken;
        } catch (error) {
          console.error("Failed to refresh access token:", error);
          alert("Session expired. Please log in again.");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return null;
        }
      };

    const handleLikeDislike = async (postId: number, action: "like" | "dislike") => {


        const accessToken = await refreshAccessToken();
        if (!accessToken) {
            return;
        }

        const message: WebSocketMessage = {
            type: action,
            id: postId,
            action: action,
            access_token: accessToken,
        };
        sendMessage(message);
    }

    
    return (
        <div className="my-3">
      <Row className="justify-content-center">
        <Col xs="auto" className="text-center">
          <Button variant="outline-success" size="sm" onClick={() => handleLikeDislike(post_Id, "like")} className="m-2">
            <FaThumbsUp className="me-2" />
            {likes} Likes
          </Button>
        </Col>
        <Col xs="auto" className="text-center">
          <Button variant="outline-danger" size="sm" onClick={() => handleLikeDislike(post_Id, "dislike")} className="m-2">
            <FaThumbsDown className="me-2" />
            {dislikes} Dislikes
          </Button>
        </Col>
      </Row>
    </div>
    );
}

export default DisplayPostStatus;
