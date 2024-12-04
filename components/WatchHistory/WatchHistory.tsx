import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
// import CustomPagination from '@/components/CustomPagination/CustomPagination';
import WatchHistoryList from './WatchHistoryList';
import { useWatchHistory } from '@/hooks/useWatchHistory';
import  '@/styles/watchHistory.css';

const WatchHistory: React.FC = () => {
//   const [page, setPage] = useState<number>(1);
  const { movies, removeFromWatchHistory } = useWatchHistory();

  return (
    <div className="watch-history">
      <Container className="p-5">
        <h2 className="text-center mb-4">Watch History</h2>
        <WatchHistoryList movies={movies} removeFromWatchHistory={removeFromWatchHistory} />
      </Container>
      {/* Pagination */}
    </div>
  );
};

export default WatchHistory;
