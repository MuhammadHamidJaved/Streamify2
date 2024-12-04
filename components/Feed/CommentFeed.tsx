import { useEffect, useState } from "react";
import useWebSocket from "../../hooks/useWebSocket";
import axios from "axios";
import { storeTokens } from "@/app/utils/authHelpers";
import '@/styles/comment.css';

interface Comment {
    message: string;
    post_id: string;
    movie_id: string;
}

interface CommentFeedProps {
    id: string; // Post or Movie ID
    type: "post" | "movie"; // Type of content
}

const CommentFeed: React.FC<CommentFeedProps> = ({ id, type }) => {
    const { messages, sendMessage } = useWebSocket(`ws://localhost:8001/ws/comments/${type}/${id}/`);
    const [comments, setComments] = useState<Comment[]>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {
        if (messages.length > 0) {
            const newMessage = messages[messages.length - 1] as Comment;
            console.log("New comment received:", newMessage);

            if (type === 'post' && newMessage?.post_id === id) {
                setComments((prevComments) => [...prevComments, newMessage]);
            }
            if (type === 'movie' && newMessage?.movie_id === id) {
                setComments((prevComments) => [...prevComments, newMessage]);
            }
        }
    }, [messages]);

    useEffect(() => {
        // Fetch existing comments from the server
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/comments/${type}/${id}/`);
                setComments(response.data);
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [type, id]);

    // Function to refresh the access token
    const refreshAccessToken = async (): Promise<string | null> => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if (!refreshToken) {
                alert("You must be logged in to comment.");
                return null;
            }

            const response = await axios.post("http://localhost:8001/token/refresh/", {
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

    // Function to handle comment submission
    const handleCommentSubmit = async (e: React.FormEvent, commentContent: string) => {
        e.preventDefault();
        if (commentContent.trim() === "") {
            alert("Comment cannot be empty.");
            return;
        }

        // Refresh the access token before sending the comment
        const accessToken = await refreshAccessToken();
        if (!accessToken) {
            return;
        }

        // Send the new comment to the WebSocket
        sendMessage({
            type: "new_comment",
            content: commentContent,
            [`${type}_id`]: id, // Dynamically set postId or movieId
            access_token: accessToken,
        });

        setMessage("");
    };

    return (
        <div className={`comment-feed ${type}`}>
            <h4 className="comment-feed-title">
                Comments for {type === "post" ? "Post" : "Movie"}
            </h4>

            <form onSubmit={(e) => handleCommentSubmit(e, message)} className="comment-form">
                <textarea
                    placeholder="Write a comment..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="comment-textarea"
                />
                <button type="submit" className="comment-submit-btn">
                    Add Comment
                </button>
            </form>

            <ul className="comment-list">
                {comments.map((comment, index) => (
                    <li key={index} className="comment-item">
                        {comment.message}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentFeed;
