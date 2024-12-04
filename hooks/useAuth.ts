// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import axiosInstance from '@/app/utils/axiosInstance';

const useAuth = () => {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user) {
          setIsAdmin(false);
          return;
        }
        console.log(user);
        const response = await axiosInstance.get(`/users/${user.id}/verify_admin/`);
        // console.log(response.data);
        if (response.data.message === 'User is an admin') {
          setIsAdmin(true);
        }
        
      } catch (error) {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  return isAdmin;
};

export default useAuth;
