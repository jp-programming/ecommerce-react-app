import { toast } from "react-toastify";

import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { isPasswordValid } from "../services/authentication";
import Form from "../components/Form";

const useQuery = () => {
    const location = useLocation();
    return new URLSearchParams(location.search);
};

const ResetPassword = () => {
    const { resetPassword } = useAuth();
    const query = useQuery();
    const navigate = useNavigate();

    const [ newPassword, setNewPassword ] = useState('');

    const handleChange = ({ target: { value } }) => {
        setNewPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        toast.dismiss();

        try{
            if( isPasswordValid(newPassword) ) {
                await resetPassword(query.get('oobCode'), newPassword);
                toast.success('Contraseña actualizada');
                navigate('/login');
            } else {
                toast.error(`Contraseña débil: debe tener al menos 8 caracteres que contengan 
                (1 letra mayúscula, 1 letra minúscula, 1 número y 1 caracter especial)`);
            }
        } catch(error){
            error.code === 'auth/expired-action-code'
                && toast.error('El código ha expirado');
        };
    };

    if( !query.get('oobCode') ) return <Navigate to="/login" />;

    return (
        <div className="auth-container">
            <h2>Restablecer contraseña</h2>
            <Form handleSubmit={handleSubmit} showDefault={false}>
                <label htmlFor="password">Contraseña nueva</label>
                <input
                    required
                    value={newPassword}
                    type="password"
                    name="password"
                    placeholder="******"
                    onChange={handleChange}
                />

                <button className="auth-container__confirmButton">Confirmar</button>
            </Form>
        </div>
    );
};

export default ResetPassword;
