// import { useEffect, useState } from "react";
// import CommentFeed from "./CommentFeed";
// import useWebSocket from "../../hooks/useWebSocket";
// import axios from "axios";
// import { storeTokens } from "@/app/utils/authHelpers";
// import DisplayPostStatus from "./DisplayPostStatus";

// // TypeScript interfaces
// interface Post {
//   id: number;
//   content: string;
//   media_url?: string; // Optional media URL (image/video)
//   created_at: string; // Timestamp for sorting
//   likes_count: number;
//   dislikes_count: number;
// }

// interface WebSocketMessage {
//   type: "new_post" | "like" | "dislike";
//   content?: string; // For post creation
//   post_id?: number; // For like/dislike
//   action?: "create" |"like" | "dislike"; // Action type for like/dislike
//   media?: string; // Base64-encoded media for post creation
//   access_token: string;
// }

// const PostFeed: React.FC = () => {
//   const { messages, sendMessage } = useWebSocket<WebSocketMessage>("ws://localhost:8001/ws/posts/");
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [message, setMessage] = useState<string>("");
//   const [file, setFile] = useState<File | null>(null);
  

//   // Fetch existing posts from the server on component mount
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get<Post[]>("http://localhost:8000/posts/");
//         setPosts(response.data);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Handle incoming WebSocket messages
//   useEffect(() => {
//     if (messages.length > 0) {
//       const newMessage = messages[messages.length - 1] as unknown as Post;
//       console.log("New post received:", newMessage);
//       if (newMessage.id) {
//         setPosts((prevPosts) => {
//           if (!prevPosts.some((post) => post.id === newMessage.id)) {
//             return [newMessage, ...prevPosts];
//           }
//           return prevPosts;
//         });
//       }
//     }
//   }, [messages]);

//   // Refresh the access token
//   const refreshAccessToken = async (): Promise<string | null> => {
//     try {
//       const refreshToken = localStorage.getItem("refreshToken");
//       if (!refreshToken) {
//         alert("You must be logged in to perform this action.");
//         return null;
//       }

//       const response = await axios.post("http://localhost:8000/token/refresh/", {
//         refresh: refreshToken,
//       });

//       const newAccessToken = response.data.access;
//       const newRefreshToken = response.data.refresh;
//       storeTokens(newAccessToken, newRefreshToken);
//       console.log("Access token refreshed.");
//       return newAccessToken;
//     } catch (error) {
//       console.error("Failed to refresh access token:", error);
//       alert("Session expired. Please log in again.");
//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       return null;
//     }
//   };

//   // Convert file to Base64
//   const fileToBase64 = (file: File): Promise<string> =>
//     new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });

//   // Handle post submission
//   const handlePostSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (message.trim() === "") {
//       alert("Message cannot be empty.");
//       return;
//     }

//     const accessToken = await refreshAccessToken();
//     if (!accessToken) return;

//     let mediaBase64 = null;
//     if (file) {
//       mediaBase64 = await fileToBase64(file);
//     }

//     const messageData: WebSocketMessage = {
//       type: "new_post",
//       action: "create",
//       content: message,
//       media: mediaBase64 || undefined,
//       access_token: accessToken,
//     };

//     // Send post creation message to WebSocket
//     // console.log("Sending post:", messageData);
//     sendMessage(messageData);

//     // Reset input fields
//     setMessage("");
//     setFile(null);
//     (e.target as HTMLFormElement).reset();
//   };



//   return (
//     <div>
//       <form onSubmit={handlePostSubmit}>
//         <textarea
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Write a post..."
//         />
//         <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
//         <button type="submit">Post</button>
//       </form>

//       <div>
//         {posts.map((post) => (
//           <div key={post.id}>
//             <div>
//               <h3>{post.content}</h3>
//               {post.media_url && <img src={post.media_url} alt="Media" />}
//               <p>{post.created_at}</p>

              
//               <DisplayPostStatus post_Id={post.id} />
                
//             </div>
//             <CommentFeed id={post.id.toString()} type="post" />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PostFeed;




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
