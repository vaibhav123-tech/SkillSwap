import React from 'react';
import { Routes, Route } from 'react-router-dom';     // ← no Router import
import Home    from './pages/Home';
import Users   from './pages/User';                  
import Matched from './pages/Matched';
import Register from './pages/Register'; // ← import the Register component
import Login   from './pages/Login';     // ← import the Login component
import LandingPage from './pages/Landing'; // ← import the LandingPage component


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/getUsers" element={<Users />} />
      <Route path="/matchUsers/:id" element={<Matched />} />

    </Routes>
  );
}
