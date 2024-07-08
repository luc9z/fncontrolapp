// src/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import './style.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [overlay, setOverlay] = useState(null); // 'register', 'forgot-password' ou null
  const { signIn, signUp, loadingAuth } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // Implementar lógica de registro
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // Implementar lógica de recuperação de senha
  };

  return (
    <div className="auth-container">
      <div className={`overlay ${overlay ? 'active' : ''}`} onClick={() => setOverlay(null)}></div>
      <div className="auth-form">
        <form onSubmit={handleLogin}>
          <h2>Login</h2>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Login'}</button>
          <div className="auth-links">
            <span onClick={() => setOverlay('register')}>Registrar-se</span>
            <span onClick={() => setOverlay('forgot-password')}>Esqueci Minha Senha</span>
          </div>
        </form>
      </div>

      {overlay === 'register' && (
        <div className="auth-overlay">
          <form onSubmit={handleRegister}>
            <h2>Registrar-se</h2>
            {/* Campos para registro */}
            <button type="submit">Registrar</button>
            <span onClick={() => setOverlay(null)}>Cancelar</span>
          </form>
        </div>
      )}

      {overlay === 'forgot-password' && (
        <div className="auth-overlay">
          <form onSubmit={handleForgotPassword}>
            <h2>Recuperar Senha</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <button type="submit">Recuperar</button>
            <span onClick={() => setOverlay(null)}>Cancelar</span>
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
