import React from 'react';
import { Routes, Route } from 'react-router-dom';     // ← no Router import
import Home    from './pages/Home';
import Users   from './pages/User';                  
import Matched from './pages/Matched';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/getUsers" element={<Users />} />
      <Route path="/matchUsers/:id" element={<Matched />} />
    </Routes>
  );
}
