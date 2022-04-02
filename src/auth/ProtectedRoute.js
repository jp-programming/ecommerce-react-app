import { Navigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if( loading ) return <Loader/>;

    if( !user ) return <Navigate to="/login" />;
     
    return (
        <>
            {children}
        </>
    );
};

export default ProtectedRoute;
