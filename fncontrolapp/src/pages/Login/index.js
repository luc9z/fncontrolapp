import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import logo from '../../assets/logos/logo2.png';
import backBtn from '../../assets/pics/back-button-icon-png-27.jpg';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import './style.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formType, setFormType] = useState('initial'); // default to 'initial'
  const [overlay, setOverlay] = useState(null); // 'register', 'forgot-password' ou null

  const { signIn, signUp, loadingAuth } = useContext(AuthContext);

  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handlePage = (type) => {
    setFormType(type);
    setFullName('');
    setPhoneNumber('');
    setEmail('');
    setPassword('');
    setConfirmPass('');
    setShowPassword(false);
  };

  const handlePhoneInput = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await signIn(email, password);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (
      fullName !== '' &&
      phoneNumber &&
      email !== '' &&
      password !== '' &&
      confirmPass !== ''
    ) {
      if (validPhone(phoneNumber)) {
        if (validPassword(password)) {
          if (password === confirmPass) {
            await signUp(capitalize(fullName), phoneNumber, email, password);
          } else {
            toast.error('Senhas não coincidem!');
            setConfirmPass('');
          }
        } else {
          toast.error(
            'A senha deve conter 6 caracteres, um caractere especial, um número e uma letra maiúscula.'
          );
          setPassword('');
          setConfirmPass('');
        }
      } else {
        toast.error('Número de telefone inválido');
        setPhoneNumber('');
      }
    } else {
      toast.error('Todos os campos devem ser preenchidos');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    // Implementar lógica de recuperação de senha
  };

  function validPassword(senha) {
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d)(?=.*[A-Z]).{6,}$/;
    return passwordRegex.test(senha);
  }

  function validPhone(phoneNum) {
    const phoneRegex = /^\(\d{2}\) 9\d{4}-\d{4}$/;
    return phoneRegex.test(phoneNum);
  }

  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div className="auth-container">
      {formType === 'initial' ? (
        <>
          <div className="auth-form">
            <div className='logo'>
              <img src={logo} style={{ width: '150px', alignItems: 'center' }} alt='logo' />
              <h1 style={{ color: '#00D09E', fontSize:'50px', textAlign:'center', marginTop:'5px', marginBottom:'0px'}}>FNControl</h1>
              <p style={{marginTop:'0px', fontSize:'14px', color:'white'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. </p>
            </div>
            <div className="auth-links">
              <button style={{ backgroundColor: '#00D09E'}} className='btnlogin' onClick={() => handlePage('login')}><h1 style={{ color: '#0E3E3E', fontSize:'16px', textAlign:'center', marginTop: '0px', marginBottom:'0px'}}>Login</h1></button>
              <button className='btnlogin' onClick={() => handlePage('register')}><h1 style={{ color: '#0E3E3E', fontSize:'16px', textAlign:'center', marginTop: '0px', marginBottom:'0px'}}>Registrar-se</h1></button>
              <span style={{fontSize:'16px'}} onClick={() => setOverlay('forgot-password')}>Esqueci minha senha</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="auth-header">
            <button onClick={() => handlePage('initial')} className="back-button">
              <img src={backBtn} alt="Back" style={{ width: '16px', marginRight: '8px' }} />
              Voltar
            </button>
            <h1 className="form-title">{formType === 'register' ? 'Criar uma conta' : formType === 'login' ? 'Login' : 'Recuperar Senha'}</h1>
            <div style={{ width: '16px' }}></div>
          </div>
          <div className="auth-form">
            {formType === 'login' && (
              <form onSubmit={handleLogin}>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
                <button type="submit">{loadingAuth ? 'Carregando...' : 'Login'}</button>
              </form>
            )}

            {formType === 'register' && (
              <form onSubmit={handleRegister}>
                <div className="inputField">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="inputField">
                  <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="inputField">
                  <InputMask
                    mask="(99) 99999-9999"
                    value={phoneNumber}
                    onChange={handlePhoneInput}
                    placeholder="Mobile Number"
                  >
                    {(inputProps) => <input {...inputProps} type="tel" />}
                  </InputMask>
                </div>
                <div className="inputField">
                  <input
                    type="text"
                    placeholder="Date Of Birth"
                  />
                </div>
                <div className="inputField">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!showPassword ? (
                    <BsEye size={20} onClick={() => setShowPassword(true)} />
                  ) : (
                    <BsEyeSlash size={20} onClick={() => setShowPassword(false)} />
                  )}
                </div>
                <div className="inputField">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    value={confirmPass}
                    onChange={(e) => setConfirmPass(e.target.value)}
                  />
                </div>
                <button type="submit" className="display-small">
                  {loadingAuth ? 'Carregando...' : 'Sign Up'}
                </button>
              </form>
            )}

            {overlay === 'forgot-password' && (
              <div className="auth-overlay">
                <form onSubmit={handleForgotPassword}>
                  <h2>Recuperar Senha</h2>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                  <button type="submit">Recuperar</button>
                </form>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Login;
