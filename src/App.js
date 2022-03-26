import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import ItemListContainer from "./components/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer";
import CartContext from "./components/CartContext";

const App = () => {
    return (
        <CartContext>
            <BrowserRouter>
                <NavBar/>
                <Routes>
                    <Route path="/" element={<ItemListContainer greeting="Productos disponibles"/>} />
                    <Route path="/platform/:type" element={<ItemListContainer greeting="Productos disponibles"/>} />
                    <Route path="/game/:id" element={<ItemDetailContainer/>} />
                    <Route path="/cart" element={<Cart/>} />        
                </Routes>
                <ToastContainer/>
            </BrowserRouter>
        </CartContext>
    );
}

export default App;
