import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import CartContext from "../context/CartContext";
import NavBar from "./NavBar";
import ItemListContainer from "./ItemListContainer";
import ItemDetailContainer from "./ItemDetailContainer";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Footer from "./Footer";

import ProtectedRoute from "../auth/ProtectedRoute";
import Loader from "./Loader";

const Main = () => {
    const [ loading, setLoading ] = useState(true);

    if( loading ) {
        setTimeout(() => setLoading(false), 1000);
        return <Loader/>;
    }

    return (
        <div className="page-container">
            <ProtectedRoute>
                <CartContext>
                    <NavBar/>
                    <Routes>
                        <Route path="/" element={<ItemListContainer greeting="Productos disponibles"/>} />
                        <Route path="/platform/:type" element={<ItemListContainer greeting="Productos disponibles"/>} />
                        <Route path="/game/:id" element={<ItemDetailContainer/>} />
                        <Route path="/cart" element={<Cart/>} />
                        <Route path="/checkout" element={<Checkout/>}/>
                    </Routes>
                    <Footer/>
                </CartContext>
            </ProtectedRoute>
        </div>
    );
}

export default Main;