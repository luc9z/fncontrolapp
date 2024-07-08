// src/contexts/AuthContext.js
import { useState, createContext, useEffect } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../services/firebaseConnection';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
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

  const logout = async () => {
    await signOut(auth);
    localStorage.removeItem('fncontrolapp');
    setUser(null);
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ signed: !!user, user, signIn, signUp, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
