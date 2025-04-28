// src/pages/Matched.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Matched() {
  const { id } = useParams();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:5000/api/matchUsers/${id}`)
      .then(res => {
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        return res.json();
      })
      .then(({ matchedUsers }) => setMatchedUsers(matchedUsers))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading matched users…</p>;
  if (error)   return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px', fontFamily: 'Segoe UI, sans-serif' }}>
      <h1>Matched Users</h1>
      {matchedUsers.length > 0 ? (
        <ul>
          {matchedUsers.map(u => (
            <li key={u._id}>
              <strong>{u.name}</strong> — {u.email}
            </li>
          ))}
        </ul>
      ) : (
        <p>No matched users found.</p>
      )}
    </div>
  );
}
