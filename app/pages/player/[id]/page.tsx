// 'use client';
// import React, { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import axios from "axios";
// import { FaStar } from "react-icons/fa";
// import CommentFeed from "@/components/Feed/CommentFeed";
// import axiosInstance from "@/app/utils/axiosInstance";

// const TMDB_API_KEY = "94423c85c9367525fa4fc765186c06ca"; // Replace with your TMDb API key

// const Player: React.FC = () => {
//   const { id } = useParams();
//   const [player, setPlayer] = useState<string>("vidsrc");
//   const [movieData, setMovieData] = useState<any>(null);
//   const [comments, setComments] = useState<string[]>([]);
//   const [newComment, setNewComment] = useState<string>("");
//   const [userRating, setUserRating] = useState<number>(0);
//   const [timeSpent, setTimeSpent] = useState<number>(0);


//   useEffect(() => {
//     // Fetch movie details from TMDb API
//     const fetchMovieDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=en-US`
//         );
//         setMovieData(response.data);
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//       }
//     };

//     fetchMovieDetails();
//   }, [id]);


//   const handleRating = (rating: number) => {
//     setUserRating(rating);
//   };

//   useEffect(() => {
//     // Set an interval to track time spent on the page
//     const timer = setInterval(() => {
//       setTimeSpent((prevTime) => prevTime + 1); // Increment time every minute (60000 ms)
//     }, 60000); // Runs every minute

//     // Clean up the interval on component unmount
//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     // Add movie to watch history after 20 minutes (1200 seconds)
//     if (timeSpent >= 1 && movieData) {
//       const addToWatchHistory = async () => {
//         try {
//           const profileId = JSON.parse(localStorage.getItem("selectedProfileId") || "{}");

//           if (!profileId) {
//             console.error("Profile ID not found");
//             return;
//           }

//           const response = await axiosInstance.post(`/profiles/${profileId}/add_to_watch_history/`, {
//             tmdb_movie_id: id,
//           });

//           alert("Movie added to watch history successfully!");
//           console.log('Movie added to watch history:', response.data);
//           // console.error("Error adding movie to watch history:", response.data);
//         } catch (error) {
//           if (axios.isAxiosError(error) && error.response) {
//             alert(error.response.data?.error || "Failed to add movie to watch history.");
//             console.error("Error adding movie to watch history:", error.response);
//           } else {
//             alert("Failed to add movie to watch history.");
//             console.error("Error adding movie to watch history:", error);
//           }
//         }
//       };

//       addToWatchHistory();
//     }
//   }, [timeSpent, movieData]);

//   // Styles with modern design
//   const styles = {
//     container: {
//       backgroundColor: "#dad7cd",
//       minHeight: "100vh",
//       padding: "20px",
//       fontFamily: "'Poppins', sans-serif",
//     },
//     header: {
//       display: "flex",
//       justifyContent: "space-between",
//       alignItems: "center",
//       marginBottom: "20px",
//     },
//     link: {
//       backgroundColor: "#3a5a40",
//       color: "#dad7cd",
//       padding: "10px 20px",
//       borderRadius: "5px",
//       textDecoration: "none",
//       transition: "background-color 0.3s ease",
//     },
//     linkHover: {
//       backgroundColor: "#588157",
//     },
//     iframeWrapper: {
//       borderRadius: "10px",
//       overflow: "hidden",
//       width: "100%",
//       height: "70vh",
//       marginBottom: "20px",
//       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
//     },
//     detailsWrapper: {
//       display: "flex",
//       gap: "20px",
//       backgroundColor: "#a3b18a",
//       borderRadius: "10px",
//       padding: "20px",
//       boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
//     },
//     image: {
//       borderRadius: "10px",
//     },
//     textWrapper: {
//       flex: 1,
//       color: "#344e41",
//     },
//     footer: {
//       display: "flex",
//       justifyContent: "start",
//       alignItems: "center",
//       margin: "20px",
//       padding: "20px",
//       backgroundColor: "#a3b18a",
//       height: "100px",
//     },
//     button: {
//       backgroundColor: "#588157",
//       color: "white",
//       padding: "10px 20px",
//       borderRadius: "5px",
//       border: "none",
//       cursor: "pointer",
//       transition: "transform 0.2s ease, background-color 0.3s ease",
//       margin: "0 10px",
//     },
//     buttonHover: {
//       backgroundColor: "#344e41",
//       transform: "scale(1.05)",
//     },
//     commentBox: {
//       backgroundColor: "#344e41",
//       padding: "20px",
//       borderRadius: "10px",
//       color: "#dad7cd",
//       boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
//       margin: "20px",
//     },
//   };

//   if (!movieData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <Link href="/pages" style={styles.link}>
//           Back
//         </Link>
//       </div>

//       {/* Movie Player */}
//       <div style={styles.iframeWrapper}>
//         <iframe
//           src={
//             player === "vidsrc"
//               ? `https://vidsrc.pro/embed/movie/${id}`
//               : `https://multiembed.mov/?video_id=${id}&tmdb=1`
//           }
//           width="100%"
//           height="100%"
//           frameBorder="0"
//           allowFullScreen
//         ></iframe>
//       </div>

//       {/* Server Buttons */}
//       <div style={styles.footer}>
//         <h4 style={{ marginRight: "10px", color: "#344e41" }}>Servers:</h4>
//         <button
//           style={styles.button}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#344e41")}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#588157")}
//           onClick={() => setPlayer("vidsrc")}
//         >
//           Vidsrc
//         </button>
//         <button
//           style={styles.button}
//           onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#344e41")}
//           onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#588157")}
//           onClick={() => setPlayer("other")}
//         >
//           Other
//         </button>
//       </div>

//       {/* Movie Details */}
//       <div style={styles.detailsWrapper}>
//         <div>
//           <Image
//             src={`https://image.tmdb.org/t/p/w500${movieData.poster_path}`}
//             alt={movieData.title}
//             width={300}
//             height={450}
//             style={styles.image}
//           />
//         </div>
//         <div style={styles.textWrapper}>
//           <h2>{movieData.title}</h2>
//           <p>
//             <strong>Overview:</strong> {movieData.overview}
//           </p>
//           <p>
//             <strong>Genre:</strong>{" "}
//             {movieData.genres.map((genre: any) => genre.name).join(", ")}
//           </p>
//           <p>
//             <strong>Release Date:</strong> {movieData.release_date}
//           </p>
//           <p>
//             <strong>Rating:</strong> {movieData.vote_average} / 10
//           </p>
//         </div>
//       </div>

//       {/* Comments Section */}
//       <div style={styles.commentBox}>
//         <h3>Rate this Movie</h3>
//         <div>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <FaStar
//               key={star}
//               size={24}
//               color={star <= userRating ? "#588157" : "#ccc"}
//               onClick={() => handleRating(star)}
//               style={{ cursor: "pointer", marginRight: "5px" }}
//             />
//           ))}
//         </div>
//         <CommentFeed id={id.toString()} type="movie" />
        
//       </div>
//     </div>
//   );
// };

// export default Player;



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

