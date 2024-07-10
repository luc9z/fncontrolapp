import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/authContext';
import logo from '../../assets/logos/logo2.png';
import backBtn from '../../assets/pics/back-button-icon-png-27.jpg';
import facebook from '../../assets/logos/Facebook.png';
import google from '../../assets/logos/Google.png';
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { toast } from 'react-toastify';
import InputMask from 'react-input-mask';
import './style.css';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formType, setFormType] = useState('initial'); // default to 'initial'

  const { signIn, signUp, signInWithGoogle, signInWithFacebook, loadingAuth } = useContext(AuthContext);

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
          <div className="auth-options">
            <div className='logo'>
              <img src={logo} style={{ width: '150px', alignItems: 'center' }} alt='logo' />
              <h1 style={{ color: '#00D09E', fontSize:'50px', textAlign:'center', marginTop:'5px', marginBottom:'0px'}}>FNControl</h1>
              <p style={{marginTop:'0px', fontSize:'14px', color:'white'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod. </p>
            </div>
            <div className="auth-links">
              <button style={{ backgroundColor: '#00D09E'}} className='btnlogin' onClick={() => handlePage('login')}><h1 style={{ color: '#0E3E3E', fontSize:'16px', textAlign:'center', marginTop: '0px', marginBottom:'0px'}}>Login</h1></button>
              <button className='btnlogin' onClick={() => handlePage('register')}><h1 style={{ color: '#0E3E3E', fontSize:'16px', textAlign:'center', marginTop: '0px', marginBottom:'0px'}}>Registrar-se</h1></button>
              <span style={{fontSize:'16px'}} onClick={() => handlePage('forgot-password')}>Esqueci minha senha</span>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="auth-header">
            <button onClick={() => handlePage('initial')} className="back-button">
              <img src={backBtn} alt="Back" style={{ width: '60px', marginRight: '8px' }} />
            </button>
            <h1 className="form-title">{formType === 'register' ? 'Bem-vindo' : formType === 'login' ? 'Login' : 'Recuperar Senha'}</h1>
            <div style={{ width: '90px' }}></div>
          </div>
          <div className="auth-form">
            {formType === 'login' && (
              <form className="inputs" onSubmit={handleLogin}>
                <div className="inputField">
                <label style={{color:'white', marginbottom:'8px'}}>Username ou Email</label>
                  <input
                    type="email"
                    placeholder="teste@teste.com" required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="inputField">
                  <label style={{color:'white', marginbottom:'8px'}}>Senha</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="body-medium text-primary"
                    placeholder="Insira sua senha" required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {!showPassword ? (
                    <BsEye style={{}} size={20} onClick={() => setShowPassword(true)} />
                  ) : (
                    <BsEyeSlash
                      style={{}}
                      size={20}
                      onClick={() => setShowPassword(false)}
                    />
                  )}
                </div>
                <div className="btnAlt">
                <button className="btnConfirm" type="submit">{loadingAuth ? 'Carregando...' : 'Login'}</button>
                <span style={{fontWeight:'bold', fontSize:'14px', color:'white', marginTop:'20px'}} onClick={() => handlePage('forgot-password')}>Esqueceu sua senha?</span>
                <span style={{ fontWeight:'bold', fontSize: '14px', color: 'white', marginTop:'20px' }} onClick={() => handlePage('fingerprint')}>
                  Use a <span style={{ color: '#00D09E'}}>digital</span> para acessar.
                </span>

                  <div>
                  <p style={{fontSize:'14px', color: 'white'}}>Ou se registre com:</p>
                <button onClick={signInWithFacebook} style={{backgroundColor:'transparent', border:'none'}}>
                  <img src={facebook} alt="Facebook login" style={{ width: '30px' }} />
                </button>
                <button onClick={signInWithGoogle} style={{backgroundColor:'transparent', border:'none'}}>
                  <img src={google} alt="Google login" style={{ width: '30px' }} />
                </button>
                  </div>
                <p style={{fontSize:'14px', color: 'white'}}>Não tem uma conta?<a style={{textDecoration:'none', color:'#00D09E'}} href='#'> Registre-se</a></p>
                </div>
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

            {formType === 'forgot-password' && (
              <div className="auth-f">
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
