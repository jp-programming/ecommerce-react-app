import { toast } from "react-toastify";
import { isEmail, isStrongPassword, isMobilePhone, isAlpha } from "validator";

export const isEmailValid = (email) => isEmail(email);
export const isPasswordValid = (password) => isStrongPassword(password);
export const isPhoneValid = (phone) => isMobilePhone(phone);
export const isNameValid = (name) => isAlpha(name);

export const isEmailPassword = (email, password) => {
    toast.dismiss();
    
    const emailValid = isEmailValid(email);
    const passwordValid = isPasswordValid(password);

    (emailValid || toast.error('El correo no es válido')) 
        &&
    (passwordValid || toast.error(`Contraseña débil: debe tener 
        al menos 8 caracteres que contengan 
        (1 letra mayúscula, 1 letra minúscula, 1 número y 1 caracter especial)`));

    return emailValid && passwordValid;
};

export const isNamePhone = (name, phone) => {
    toast.dismiss();

    const nameValid = isNameValid(name);
    const phoneValid = isPhoneValid(phone);

    (nameValid || toast.error('El nombre no es válido')) 
        &&
    (phoneValid || toast.error('El teléfono no es válido'));

    return nameValid && phoneValid;
};

export const onChange = ({ target: { name, value } }, state, setState) => 
    setState({ ...state, [name]: value });