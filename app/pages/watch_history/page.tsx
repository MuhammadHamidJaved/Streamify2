// 'use client';
// import axiosInstance from '@/app/utils/axiosInstance';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import CustomPagination from '@/components/CustomPagination/CustomPagination';
// import axios from 'axios';

// interface Movie {
//   tmdb_movie_id: number;
// }

// interface MovieDetails {
//     title: string;
//     poster_path: string;
// }

// const WatchHistory: React.FC = () => {
//   const [movies, setMovies] = useState<Movie[]>([]);
//   const [movieDetails, setMovieDetails] = useState<Record<number, MovieDetails>>({});
//   const [page, setPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(0);

//   // Fetch Watch History Data
//   const getWatchHistory = async () => {
//     try {
//       const profileId = JSON.parse(localStorage.getItem('selectedProfileId') || '{}');

//       if (!profileId) {
//         console.error('Profile ID not found in local storage');
//         return;
//       }

//       const response = await axiosInstance.get(`/profiles/${profileId}/get_watch_history?page=${page}`);
//       console.log('Watch History:', response.data);
//       setMovies(response.data);
//     //   setTotalPages(response.data.total_pages);
//     } catch (error) {
//       console.error('Error fetching watch history:', error);
//     }
//   };

//   // Remove movie from watch history
//   const removeFromWatchHistory = async (movieId: number) => {
//     try {
//       const profileId = JSON.parse(localStorage.getItem('selectedProfileId') || '{}');

//       if (!profileId) {
//         console.error('Profile ID not found in local storage');
//         return;
//       }

//       await axiosInstance.post(`/profiles/${profileId}/remove_from_watch_history/`, {
//           tmdb_movie_id: movieId,
//       });

//       // Update the watch history after removing the movie
//       setMovies((prevMovies) => prevMovies.filter((movie) => movie.tmdb_movie_id !== movieId));
//     } catch (error) {
//       console.error('Error removing movie from watch history:', error);
//     }
//   };

//   const fetchMovieDetails = async (movieId: number) => {
//     try {
//       if (!movieDetails[movieId]) {
//         const response = await axios.get(
//           `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
//         );
//         setMovieDetails((prevDetails) => ({
//           ...prevDetails,
//           [movieId]: response.data,
//         }));
//       }
//     } catch (error) {
//       console.error('Error fetching movie details:', error);
//     }
//   };

//   // Fetch Details for All Movies in Watchlist
//   const fetchAllMovieDetails = async () => {
//     await Promise.all(movies.map((movie) => fetchMovieDetails(movie.tmdb_movie_id)));
//   };

//   useEffect(() => {
//     getWatchHistory();
//   }, [page]);

//     useEffect(() => {
//         fetchAllMovieDetails();
//     }, [movies]);

//   return (
//     <div>
//       <Container className="p-5">
//         <h2 className="text-center mb-4">Watch History</h2>
//         <Row>
//           {movies && movies.length > 0 ? (
//             movies.map((movie: Movie, index: number) => {

//                 const details = movieDetails[movie.tmdb_movie_id];
                
                
//                 return(
//               <Col key={index} xs={8} sm={6} md={4} lg={3} className="mb-4 m-auto">
//                 <Card style={{ width: '100%' }}>
//                   <Link href={`/pages/player/${movie.tmdb_movie_id}`}>
//                     <Card.Img
//                       variant="top"
//                       src={`https://image.tmdb.org/t/p/w500/${details?.poster_path}`}
//                         alt={details?.title}
//                       style={{ objectFit: 'cover' }}
//                     />
//                   </Link>
//                   <Card.Body className="text-center">
//                     <Button
//                       variant="danger"
//                       onClick={() => removeFromWatchHistory(movie.tmdb_movie_id)}
//                     >
//                       Remove
//                     </Button>
//                   </Card.Body>
//                 </Card>
//               </Col>
//             )})
//           ) : (
//             <h3 className="text-center">No movies in watch history</h3>
//           )}
//         </Row>
//       </Container>

//       {/* Pagination */}
//       <div className="w-100 d-flex justify-content-center">
//         <CustomPagination page={page} totalPages={totalPages} setPage={setPage} />
//       </div>
//     </div>
//   );
// };

// export default WatchHistory;



'use client';

import React from 'react';
import WatchHistory from '@/components/WatchHistory/WatchHistory';

const WatchHistoryPage: React.FC = () => {
  return <WatchHistory />;
};

export default WatchHistoryPage;
