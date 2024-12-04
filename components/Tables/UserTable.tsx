// src/components/tables/UserTable.tsx

import React from 'react';
import { User } from '../../types/User';
// import { deleteUser, banUser } from '../../services/apiService';

interface UserTableProps {
  users: User[];
  onDeleteUser: (userId: number) => void;
  onBanUser: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, onDeleteUser, onBanUser }) => {
  return (
    <table className="table table-striped table-responsive">
      <thead className="thead-dark">
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user)=>(
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.is_active ? 'Active' : 'Banned'}</td>
            <td>
              <button className="btn btn-danger btn-sm me-2" onClick={() => onDeleteUser(user.id)}>
                Remove
              </button>
              <button className="btn btn-warning btn-sm" onClick={() => onBanUser(user.id)}>
                Ban
              </button>
            </td>
          </tr>
        ))}
        </tbody>
    </table>
    );
}

export default UserTable;
