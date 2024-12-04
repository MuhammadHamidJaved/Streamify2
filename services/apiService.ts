// src/services/apiService.ts

import axiosInstance from "@/app/utils/axiosInstance";

export const fetchPosts = async () => {
  try {
    const response = await axiosInstance.get('/posts/');
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const fetchUsers = async () => {
  try {
    const response = await axiosInstance.get('/users/');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const deleteUser = async (id: number) => {
  try {
    await axiosInstance.delete(`/users/${id}/`);
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

export const banUser = async (id: number) => {
  try {
    await axiosInstance.patch(`/users/${id}/`, { is_active: false });
  } catch (error) {
    console.error('Error banning user:', error);
    throw error;
  }
};

export const deletePost = async (id: number) => {
  try {
    await axiosInstance.delete(`/posts/${id}/`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};

import axios from "axios";

export const fetchMovieDetails = async (id: string, apiKey: string | undefined) => {
    if (!apiKey) {
      console.error("API key is missing");
      return null;
    }
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching movie details:", error);
      return null;
    }
  };