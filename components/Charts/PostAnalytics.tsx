// src/components/AdminDashboard/PostAnalytics.tsx
import { Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart components
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';

// Registering required components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement, // Registering the Point element
  LineElement   // Registering the Line element (for line charts)
);

interface Post {
  id: number;
  created_at: string;
  likes_count: number;
  dislikes_count: number;
}

interface PostAnalyticsProps {
  posts: Post[];
}

const PostAnalytics = ({ posts }: PostAnalyticsProps) => {
  const postLikesData = {
    labels: posts.map((post) => {
      const date = new Date(post.created_at);
      return `${date.getDate()}/${date.getMonth() + 1}`;
    }),
    datasets: [
      {
        label: 'Likes',
        data: posts.map((post) => post.likes_count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Dislikes',
        data: posts.map((post) => post.dislikes_count),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  return <Line data={postLikesData} options={{ responsive: true }} />;
};

export default PostAnalytics;
