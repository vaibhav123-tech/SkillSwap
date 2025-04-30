import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Matched.css';

export default function Matched() {
  const { id } = useParams();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="matched-container">
      {matchedUsers.length > 0 ? (
        matchedUsers.map(user => (
          <div className="user-card" key={user._id}>
            <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`} alt="avatar" />
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <div className="skills">
              <span>Wants: {(user.want || []).join(', ')}</span><br />
              <span>Offers: {(user.offer || []).join(', ')}</span>
            </div>
            <button>Chat</button>
          </div>
        ))
      ) : (
        <p>No matched users found.</p>
      )}
    </div>
  );
}
