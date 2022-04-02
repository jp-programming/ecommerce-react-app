import { toast } from "react-toastify";

import { useCallback, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

import { db } from "../Firebase";
import { doc, setDoc } from "firebase/firestore";

import { useAuth } from "../context/AuthContext";
import { isEmailPassword, isNamePhone, onChange } from "../services/authentication";

import Form from "../components/Form";

const Register = () => {
    const [ user, setUser ] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        status: false
    });

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSignUp = useCallback(() => 
        signUp(user.email, user.password), [user, signUp]);

    useEffect(() => {
        if( user.status ) {
            handleSignUp()
                .then((auth) => {
                    const docRef = doc(db, 'users', auth.user.uid);
                    setDoc(docRef, {
                        name: user.name,
                        phone: user.phone,
                        email: user.email
                    });

                    toast.success('Registro exitoso');
                    navigate('/login');
                })
                .catch((err) => {
                    err.code === 'auth/email-already-in-use'
                        && toast.error('El correo ya está en uso');
                }
            );

            setUser({...user, status: false});
        }
    }, [user, handleSignUp, navigate]);

    const handleChange = (e) => onChange(e, user, setUser);
 
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const {
            name,
            phone, 
            email, 
            password
        } = user;

        if( !isNamePhone(name, phone) ) {
            return;
        }

        if( isEmailPassword(email, password) ) {
            setUser({...user, status: true});
        }
    };

    return (
        <div className="auth-container">
            <h2>Crear cuenta</h2>
            <Form handleChange={handleChange} handleSubmit={handleSubmit}>
                <label htmlFor="name">Nombre</label>
                <input
                    required 
                    type="text" 
                    name="name"
                    placeholder="Tu nombre"
                    onChange={handleChange}
                />

                <label htmlFor="phone">Teléfono</label>
                <input
                    required
                    type="tel"
                    name="phone"
                    placeholder="+1-212-456-7890"
                    onChange={handleChange}
                />

                <button className="auth-container__signInButton" >Registrarse</button>
            </Form>
        </div>
    );
};

export default Register;