// src/components/tables/PostTable.tsx

import React from 'react';
import { Post } from '../../types/Post';
import { deletePost } from '../../services/apiService';

interface PostTableProps {
  posts: Post[];
  onDeletePost: (postId: number) => void;
}

const PostTable: React.FC<PostTableProps> = ({ posts, onDeletePost }) => {
  return (
    <table className="table table-striped table-responsive">
      <thead className="thead-dark">
        <tr>
          <th>POST ID</th>
          <th>User</th>
          <th>Likes</th>
          <th>Dislikes</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {posts.map((post) => (
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.author}</td>
            <td>{post.likes_count}</td>
            <td>{post.dislikes_count}</td>
            <td>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => onDeletePost(post.id)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PostTable;
