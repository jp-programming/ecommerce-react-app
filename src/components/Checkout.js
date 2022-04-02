import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import { db } from "../Firebase";
import { doc, getDoc, addDoc, collection, serverTimestamp } from "firebase/firestore";

const Checkout = () => {
    const [ orderId, setOrderId ] = useState('');
    const { user:{uid} } = useAuth();
    const { cart, total, totalAmount, newOrder, createOrder } = useCart();

    useEffect(() => {
        if( newOrder ) {
            const generateOrder = async () => {
                const docRef = doc(db, 'users', uid);
                const docSnap = await getDoc(docRef);

                const order = {
                    id: uid,
                    buyer: {
                        ...docSnap.data()
                    },
                    games: cart,
                    total: total,
                    totalAmount: totalAmount,
                    date: serverTimestamp()
                };
            
                const orderRef = await addDoc(collection(db, 'orders'), order);
                setOrderId(orderRef.id)
            };
    
            generateOrder();
        }
        
        return () => {
            createOrder(false);
        }
    }, [uid, cart, total, totalAmount, newOrder, createOrder]);

    return (
        <div className="checkout">
            { total && newOrder
                ?  <div className="checkout__container">
                    <h2>Checkout</h2>
                    <span>Código de orden: {orderId}</span>
                    <span>Total de productos: {total}</span>
                    <span>Total: ${totalAmount}</span>
                </div>
                : <div className="checkout__empty">
                    <h2>Debe de realizar el checkout del carrito</h2>
                    <Link to="/">Volver a comprar</Link>
                </div>
            }
        </div>
    );
};

export default Checkout;
