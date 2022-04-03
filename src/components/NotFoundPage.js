import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="not-found-page">
            <h1>404</h1>
            <h2>Página no encontrada</h2>
            <Link to="/">Ir al inicio</Link>
        </div>
    );
};

export default NotFoundPage;
