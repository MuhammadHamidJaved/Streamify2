// src/hooks/useFetchUsers.ts

import { useState, useEffect } from 'react';
import { User } from '../types/User';
import { fetchUsers } from '../services/apiService';

export const useFetchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const usersData = await fetchUsers();
        setUsers(usersData);
      } catch (err) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  return { users, loading, error };
};
