// src/routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SplashScreen from '../pages/SplashScreen';
import Login from '../pages/Login';
import Home from '../pages/Home';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
  );
};

export default AppRoutes;