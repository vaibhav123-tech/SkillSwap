// src/pages/Users.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../contexts/user_context';  // adjust path
import './User.css';

export default function Users() {
  const [users, setUsers]     = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate              = useNavigate();
  const { userId, setUserId } = useUserContext();

  useEffect(() => {
    fetch('http://localhost:5000/api/getAllUsers')
      .then(res => res.json())
      .then(data => {
        setUsers(Array.isArray(data.users) ? data.users : []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setUsers([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="loading">Loading users…</p>;

  return (
    <div className="user-container">
      <div className="user-header">
        <p className="p-header">Users with Your Wanted Skills</p>
        {userId && (
          <button
            className="b-header"
            onClick={() => navigate(`/matchUsers/${userId}`)}
          >
            Matched Skills
          </button>
        )}
      </div>

      <h2 className="all-users-title">All Users</h2>

      {users.length === 0 ? (
        <p className="no-users">No users found.</p>
      ) : (
        <div className="user-profiles">
          {users.map(user => (
            <div key={user._id} className="user-profile">
              <div className="user-info">
                <div className="user-name">{user.name}</div>
                <div className="user-bio">{user.email}</div>
                <div className="user-skills">
                  <div className="skills-group">
                    <strong>Offers:</strong>
                    {user.offeredSkills.map(skill => (
                      <span key={skill} className="skill-pill offer-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="skills-group">
                    <strong>Wants:</strong>
                    {user.wantedSkills.map(skill => (
                      <span key={skill} className="skill-pill want-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="user-actions">
                <button
                  className="user-button primary"
                  onClick={() => {
                    setUserId(user._id);           // set this user as current
                    navigate(`/matchUsers/${user._id}`);
                  }}
                >
                  Matches
                </button>
                <button className="user-button secondary">
                  Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
