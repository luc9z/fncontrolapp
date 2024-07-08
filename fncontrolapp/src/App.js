// src/App.js
import React from 'react';
import AppRoutes from '../src/routes/index'
import AuthProvider from './contexts/authContext';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter className="App">
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;