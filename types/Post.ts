// src/types/Post.ts

export interface Post {
    id: number;
    author: string;
    content: string;
    media_url?: string;
    created_at: string;
    likes_count: number;
    dislikes_count: number;
  }
  