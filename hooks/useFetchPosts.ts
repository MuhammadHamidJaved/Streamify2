// src/hooks/useFetchPosts.ts

import { useState, useEffect } from 'react';
import { Post } from '../types/Post';
import { fetchPosts } from '../services/apiService';

export const useFetchPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const postsData = await fetchPosts();
        setPosts(postsData);
      } catch (err) {
        setError('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  return { posts, loading, error };
};
