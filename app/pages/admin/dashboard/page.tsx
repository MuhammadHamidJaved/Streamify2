// 'use client';

// import { useEffect, useState } from 'react';
// import axiosInstance from '@/app/utils/axiosInstance';
// import useWebSocket from '@/hooks/useWebSocket';
// import { Line, Bar } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import 'bootstrap/dist/css/bootstrap.min.css';

// // Register chart components
// ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend);

// interface Post {
//   id: number;
//   author: string;
//   content: string;
//   media_url?: string;
//   created_at: string;
//   likes_count: number;
//   dislikes_count: number;
// }

// interface User {
//   id: number;
//   username: string;
//   email: string;
//   is_active: boolean;
// }

// const AdminDashboard = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [users, setUsers] = useState<User[]>([]);
//   const { messages } = useWebSocket('ws://localhost:8001/ws/posts/');

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axiosInstance.get<Post[]>('/posts/');
//         const postArray = response.data;
//         console.log('Post Array:', postArray);
//         if (Array.isArray(postArray)) {
//           setPosts(postArray);
//         } else {
//           console.error('Posts data is not an array:', response.data);
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     const fetchUsers = async () => {
//       try {
//         const response = await axiosInstance.get<User[]>('/users/');
//         setUsers(response.data);
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchPosts();
//     fetchUsers();
//   }, []);

//   // Real-time updates for posts
//   useEffect(() => {
//     if (messages.length > 0) {
//       const newMessage = messages[messages.length - 1] as unknown as Post;
//       if (newMessage.id) {
//         setPosts((prevPosts) => {
//           const index = prevPosts.findIndex((post) => post.id === newMessage.id);
//           if (index !== -1) {
//             prevPosts[index] = {
//               ...prevPosts[index],
//               likes_count: newMessage.likes_count,
//               dislikes_count: newMessage.dislikes_count,
//             };
//             return [...prevPosts];
//           }
//           return [...prevPosts, newMessage];
//         });
//       }
//     }
//   }, [messages]);

//   // Data for total posts bar chart
//   const totalPostsData = {
//     labels: ['Total Posts'],
//     datasets: [
//       {
//         label: 'Number of Posts',
//         data: [posts.length],
//         backgroundColor: 'rgba(54, 162, 235, 0.6)',
//         borderColor: 'rgba(54, 162, 235, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   // Data for post likes and dislikes line chart
//   const postLikesData = {
//     labels: posts.map((post) => {
//       const date = new Date(post.created_at);
//       return `${date.getDate()}/${date.getMonth() + 1}`;
//     }),
//     datasets: [
//       {
//         label: 'Likes',
//         data: posts.map((post) => post.likes_count),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Dislikes',
//         data: posts.map((post) => post.dislikes_count),
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="container mt-5">
//       <h1>Admin Dashboard</h1>

//       {/* Grid for Charts */}
//       <div className="row mt-4">
//         <div className="col-md-6 mb-4">
//           <div className="card p-3">
//             <h3>Post Analytics</h3>
//             <Line data={postLikesData} options={{ responsive: true }} />
//           </div>
//         </div>
//         <div className="col-md-6 mb-4">
//           <div className="card p-3">
//             <h3>Total Number of Posts</h3>
//             <Bar data={totalPostsData} options={{ responsive: true }} />
//           </div>
//         </div>
//       </div>

//       {/* Large Box for User Table */}
//       <div className="mt-5">
//         <h2>User Management</h2>
//         <div className="card p-4">
//           <table className="table table-striped table-responsive">
//             <thead className="thead-dark">
//               <tr>
//                 <th>ID</th>
//                 <th>Username</th>
//                 <th>Email</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user.id}>
//                   <td>{user.id}</td>
//                   <td>{user.username}</td>
//                   <td>{user.email}</td>
//                   <td>{user.is_active ? 'Active' : 'Banned'}</td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm me-2"
//                       onClick={() => {
//                         if (confirm('Are you sure you want to remove this user?')) {
//                           axiosInstance
//                             .delete(`/users/${user.id}/`)
//                             .then(() => {
//                               setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
//                             })
//                             .catch((error) => console.error('Error removing user:', error));
//                         }
//                       }}
//                     >
//                       Remove
//                     </button>
//                     <button
//                       className="btn btn-warning btn-sm"
//                       onClick={() => {
//                         if (confirm('Are you sure you want to ban this user?')) {
//                           axiosInstance
//                             .patch(`/users/${user.id}/`, { is_active: false })
//                             .then(() => {
//                               setUsers((prevUsers) =>
//                                 prevUsers.map((u) =>
//                                   u.id === user.id ? { ...u, is_active: false } : u
//                                 )
//                               );
//                             })
//                             .catch((error) => console.error('Error banning user:', error));
//                         }
//                       }}
//                     >
//                       Ban
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Large Box for Post Table */}
//       <div className="mt-5">
//         <h2>Post Management</h2>
//         <div className="card p-4">
//           <table className="table table-striped table-responsive">
//             <thead className="thead-dark">
//               <tr>
//                 <th>POST ID</th>
//                 <th>User</th>
//                 <th>Likes</th>
//                 <th>Dislikes</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {posts.map((post) => (
//                 <tr key={post.id}>
//                   <td>{post.id}</td>
//                   <td>{post.author}</td>
//                   <td>{post.likes_count}</td>
//                   <td>{post.dislikes_count}</td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => {
//                         if (confirm('Are you sure you want to remove this post?')) {
//                           axiosInstance
//                             .delete(`/posts/${post.id}/`)
//                             .then(() => {
//                               setPosts((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
//                             })
//                             .catch((error) => console.error('Error removing post:', error));
//                         }
//                       }}
//                     >
//                       Remove
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


'use client';

import React from "react";
import useAuth from "@/hooks/useAuth";
import PostAnalytics from "@/components/Charts/PostAnalytics";
import UserTable from "@/components/Tables/UserTable";
import PostTable from "@/components/Tables/PostTable";
import TotalPostsChart from "@/components/Charts/TotalPostsChart";
import useWebSocket from "@/hooks/useWebSocket";
import { Post } from "@/types/Post";
import { User } from "@/types/User";
import { useEffect, useState } from "react";
import axiosInstance from "@/app/utils/axiosInstance";
import { 
  deleteUser,
  banUser,
  deletePost,

 } from "@/services/apiService";



const AdminDashboard = () => {
  const isAdmin = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const { messages } = useWebSocket('ws://localhost:8001/ws/posts/');

  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get<Post[]>('/posts/');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get<User[]>('/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchPosts();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1] as Post;
      if (newMessage.id) {
        setPosts((prevPosts) => {
          const index = prevPosts.findIndex((post) => post.id === newMessage.id);
          if (index !== -1) {
            prevPosts[index] = {
              ...prevPosts[index],
              likes_count: newMessage.likes_count,
              dislikes_count: newMessage.dislikes_count,
            };
            return [...prevPosts];
          }
          return [...prevPosts, newMessage];
        });
      }
    }
  }, [messages]);

  return (
    <div className="container mt-5">
      <h1>Admin Dashboard</h1>

      {/* show side by side */}
      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h3>Post Analytics</h3>
            <PostAnalytics posts={posts} />
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card p-3">
            <h3>Total Number of Posts</h3>
            <TotalPostsChart posts={posts} />
          </div>
        </div>

      </div>

      <UserTable users={users} onDeleteUser={deleteUser} onBanUser={banUser} />
      <PostTable posts={posts} onDeletePost={deletePost} />
    </div>
  );
};

export default AdminDashboard;