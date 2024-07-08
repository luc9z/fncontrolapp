// src/SplashScreen.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import './style.css';
import logo from '../../assets/logos/Vector.png';

const SplashScreen = () => {
  const [show, setShow] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, 1000);

    const navigationTimer = setTimeout(() => {
      navigate('/login');
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <CSSTransition
      in={show}
      timeout={500}
      classNames="fade"
      unmountOnExit
    >
      <div className="App">
        <div className='container'>
          <div className='logo'>
            <img src={logo} style={{ width: '160px' }} alt='logo' />
            <h1 style={{ color: 'white' }}>FNControl</h1>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
};

export default SplashScreen;
