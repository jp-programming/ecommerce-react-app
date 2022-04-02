import { toast } from "react-toastify";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from "../context/AuthContext";
import { isEmailValid, isEmailPassword, onChange } from "../services/authentication";
import Form from "../components/Form";
import Loader from "../components/Loader";

const Login = () => {
    const [ user, setUser ] = useState({
        email: '',
        password: ''
    });

    const [ loading, setLoading ] = useState(true);

    const { logIn, logInWithGoogle, forgotPassword } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => onChange(e, user, setUser);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { 
                email, 
                password
            } = user;

            if( isEmailPassword(email, password) ) {
                await logIn(email, password);
                navigate('/');
            }
        } catch (error) {
            error.code === 'auth/user-not-found'
                && toast.error('El usuario no existe');
            
            error.code === 'auth/wrong-password'
                && toast.error('La contraseña es incorrecta');
        }
    };

    const handleGoogleSignIn = async () => {
        try{
            await logInWithGoogle();
            navigate('/');
        } catch(error){
            error.code === 'auth/popup-closed-by-user'
                && toast.error('Cancelaste el inicio de sesión');
        }
    };

    const handleResetPassword = async () => {
        toast.dismiss();

        if( !isEmailValid(user.email) ) {
            toast.error('Debes ingresar un correo');
            return;
        }

        try {
            await forgotPassword(user.email);
            toast.success('Se ha enviado un correo para restablecer tu contraseña');
        } catch (error) {
            console.log(error.message)
            error.code === 'auth/user-not-found'
                && toast.error('El usuario no existe');
        }   
    };

    if( loading ) {
        setTimeout(() => setLoading(false), 1000);
        return <Loader/>;
    }

    return (
        <div className="auth-container">
            <h2>Ingresar</h2>
            <Form handleChange={handleChange} handleSubmit={handleSubmit}>
                <button className="auth-container__logInButton" >Loguear</button>
                <button className="auth-container__googleLogIn" onClick={handleGoogleSignIn}>
                    <FontAwesomeIcon icon="fa-brands fa-google" />
                </button>
            </Form>
            
            <div className="auth-container__links">
                <Link to="/register">Crear una cuenta</Link>
                <Link to="" onClick={handleResetPassword}>¿Olvidaste tu contraseña?</Link>
            </div>
        </div>
    );
}
export default Login;