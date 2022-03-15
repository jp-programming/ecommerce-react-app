import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <NavBar/>
            <Routes>
                <Route path="/" element={<ItemListContainer greeting="Productos disponibles"/>} />
                <Route path="/platform/:type" element={<ItemListContainer greeting="Productos disponibles"/>} />
                <Route path="/game/:name" element={<ItemDetailContainer/>} />
                <Route path="/cart" element={<div>Carrito</div>} />        
            </Routes>
            <ToastContainer/>
        </BrowserRouter>
    );
}

export default App;
