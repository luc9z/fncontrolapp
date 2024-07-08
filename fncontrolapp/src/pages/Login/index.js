// src/Login.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import './style.css';
import logo from '../../assets/logos/logo2.png';


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
        <div className='logo'>
            <img src={logo} style={{ width: '150px', alignItems: 'center' }} alt='logo' />
            <h1 style={{ color: '#00D09E', fontSize:'50px', textAlign:'center', marginTop:'5px', marginBottom:'0px'}}>FNControl</h1>
            <p style={{marginTop:'0px', fontSize:'14px', color:'white'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. </p>
          </div>
          <div className="auth-links">
            <button style={{ backgroundColor: '#00D09E'}} className='btnlogin' onClick={() => setOverlay('login')}><h1 style={{ color: '#0E3E3E', fontSize:'16px', textAlign:'center', marginTop: '0px', marginBottom:'0px'}}>Login</h1></button>
            <button className='btnlogin' onClick={() => setOverlay('register')}><h1 style={{ color: '#0E3E3E', fontSize:'16px', textAlign:'center', marginTop: '0px', marginBottom:'0px'}}>Registrar-se</h1></button>
            <span style={{fontSize:'16px'}}onClick={() => setOverlay('forgot-password')}>Esqueci minha senha</span>
          </div>
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

      {overlay === 'login' && (
      <div className="auth-form">
        <form onSubmit={handleLogin}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
          <button type="submit">{loadingAuth ? 'Carregando...' : 'Login'}</button>
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
