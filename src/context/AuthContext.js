import { createContext, useContext, useState, useEffect } from 'react';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    confirmPasswordReset
} from "firebase/auth";

import { auth } from "../Firebase";

export const authContext = createContext();
const { Provider } = authContext;

export const useAuth = () => useContext(authContext);

const AuthContext = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setTimeout(() => setLoading(false), 1000);
        });

        return () => unsuscribe();
    }, []);

    const signUp = (email, password) => 
        createUserWithEmailAndPassword(auth, email, password);

    const logIn = (email, password) => 
        signInWithEmailAndPassword(auth, email, password);

    const logInWithGoogle = () => {
        const GoogleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, GoogleProvider);
    }

    const forgotPassword = (email) => sendPasswordResetEmail(auth, email, 
        { url: `${window.location.origin}/login` });

    const resetPassword = (oobCode, newPassword) => 
        confirmPasswordReset(auth, oobCode, newPassword);
    
    const logOut = () => signOut(auth);

    const contextValue = {
        user,
        loading,
        signUp,
        logIn,
        logInWithGoogle,
        forgotPassword,
        resetPassword,
        logOut
    };

    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    );
}

export default AuthContext;