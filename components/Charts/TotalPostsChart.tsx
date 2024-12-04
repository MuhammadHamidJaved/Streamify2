// src/components/charts/TotalPostsChart.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Post } from '../../types/Post';

interface TotalPostsChartProps {
  posts: Post[];
}

const TotalPostsChart: React.FC<TotalPostsChartProps> = ({ posts }) => {
  const totalPostsData = {
    labels: ['Total Posts'],
    datasets: [
      {
        label: 'Number of Posts',
        data: [posts.length],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Bar data={totalPostsData} options={{ responsive: true }} />;
};

export default TotalPostsChart;
