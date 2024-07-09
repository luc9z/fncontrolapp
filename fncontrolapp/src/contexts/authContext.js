import { useState, createContext, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConnection';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';


export const AuthContext = createContext({});

function AuthProvider({ children }) {
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      const storageUser = localStorage.getItem('fncontrolapp');
      if (storageUser) {
        setUser(JSON.parse(storageUser));
      }
    };

    loadUser();
  }, []);

  const signIn = async (email, password) => {
    setLoadingAuth(true);
    try {
      const value = await signInWithEmailAndPassword(auth, email, password);
      const uid = value.user.uid;
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      const data = {
        uid,
        firstName: docSnap.data().firstName,
        lastName: docSnap.data().lastName,
        email: value.user.email,
      };

      setUser(data);
      localStorage.setItem('fncontrolapp', JSON.stringify(data));
      setLoadingAuth(false);
      navigate('/home');
    } catch (error) {
      setLoadingAuth(false);
    }
  };

  const signUp = async (firstName, lastName, email, password) => {
    setLoadingAuth(true);
    try {
      const value = await createUserWithEmailAndPassword(auth, email, password);
      const uid = value.user.uid;

      await setDoc(doc(db, 'users', uid), {
        firstName,
        lastName,
        email,
      });

      const data = {
        uid,
        firstName,
        lastName,
        email,
      };

      setUser(data);
      localStorage.setItem('fncontrolapp', JSON.stringify(data));
      setLoadingAuth(false);
      navigate('/home');
    } catch (error) {
      setLoadingAuth(false);
    }
  };

  const signInWithGoogle = async () => {
    setLoadingAuth(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const data = {
        uid: user.uid,
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1],
        email: user.email,
      };
      setUser(data);
      localStorage.setItem('fncontrolapp', JSON.stringify(data));
      setLoadingAuth(false);
      navigate('/home');
    } catch (error) {
      setLoadingAuth(false);
      console.error(error);
    }
  };

  const signInWithFacebook = async () => {
    setLoadingAuth(true);
    try {
      const result = await signInWithPopup(auth, facebookProvider);
      const user = result.user;
      const data = {
        uid: user.uid,
        firstName: user.displayName.split(' ')[0],
        lastName: user.displayName.split(' ')[1],
        email: user.email,
      };
      setUser(data);
      localStorage.setItem('fncontrolapp', JSON.stringify(data));
      setLoadingAuth(false);
      navigate('/home');
    } catch (error) {
      setLoadingAuth(false);
      console.error(error);
    }
  };



  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('fncontrolapp');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp, logout, loadingAuth, signInWithGoogle, signInWithFacebook }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
