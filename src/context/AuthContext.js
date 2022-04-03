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

import { auth, db } from "../Firebase";
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const authContext = createContext();
const { Provider } = authContext;

export const useAuth = () => useContext(authContext);

const AuthContext = ({ children }) => {
    const [ user, setUser ] = useState(null);
    const [ isGoogle, setIsGoogle ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    
    useEffect(() => {
        const unsuscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setTimeout(() => setLoading(false), 1000);
        });

        const createUser = async () => {
            const docSnap = await getDoc(doc(db, 'users', user.uid))
            docSnap.data() || setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                email: user.email,
                phone: user.phoneNumber || ''
            });
        }

        if( isGoogle && user) {
            createUser();   
        }

        return () => unsuscribe();
    }, [user, isGoogle]);

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

    const googleAuth = () => setIsGoogle(true);

    const contextValue = {
        user,
        loading,
        signUp,
        logIn,
        logInWithGoogle,
        forgotPassword,
        resetPassword,
        logOut,
        googleAuth
    };

    return (
        <Provider value={contextValue}>
            {children}
        </Provider>
    );
}

export default AuthContext;