import React, { useEffect, useState } from 'react';
import './UserList.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="status">Loading...</div>;
  if (error) return <div className="status error">{error}</div>;

  return (
    <div className="user-container">
      <h2>Users List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong>
            <br />
            <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
