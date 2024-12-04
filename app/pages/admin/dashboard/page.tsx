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