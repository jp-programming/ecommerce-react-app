import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthContext from "./context/AuthContext";

import Login from "./auth/Login";
import Register from "./auth/Register";
import ResetPassword from "./auth/ResetPassword";
import Main from "./components/Main";


library.add(fas, fab);

const App = () => {
    return (
        <AuthContext>
            <BrowserRouter>
                <Routes>        
                    <Route path="/login" element={<Login/>} /> 
                    <Route path="/register" element={<Register/>} />
                    <Route path="/reset-password" element={<ResetPassword/>} />
                    <Route path="*" element={<Main/>} /> 
                </Routes>
                <ToastContainer/>
            </BrowserRouter>
        </AuthContext>
    );
}

export default App;
