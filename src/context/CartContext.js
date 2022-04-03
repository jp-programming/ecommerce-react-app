import { toast } from "react-toastify";

import { createContext, useState, useContext, useEffect } from "react";

import {
    getDoc,
    doc,
    updateDoc,
    arrayRemove,
    setDoc
} from "firebase/firestore";

import { db } from "../Firebase";
import { useAuth } from "./AuthContext";

import { updateQT } from "../services/cart";

export const cartContext = createContext();
const { Provider } = cartContext;

export const useCart = () => useContext(cartContext);

const CartContext = ({ children }) => {
    const [ cart, setCart ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ totalAmount, setTotalAmount ] = useState(0);
    const [ update, setUpdate ] = useState(true);
    const [ newOrder, setNewOrder ] = useState(false);
    const { user:{uid} } = useAuth();

    useEffect(() => {
        if( update ) { 
            const docRef = doc(db, 'cart', uid);
            const docSnap = getDoc(docRef);

            docSnap
                .then((snapshot) => {
                    const { cart, cartQuantity, cartTotal } = snapshot.data() || {
                        cart: [] 
                    };
                    
                    if( !cart.length ) {
                        setTotal(0);
                        setTotalAmount(0);
                        return [];
                    };
                
                    setTotal(cartQuantity);
                    setTotalAmount(cartTotal);
                    
                    return Promise.all(cart.map( async (g) => 
                        ({
                            id: g.id,
                            ...(await getDoc(doc(db, 'games', g.id))).data(),
                            quantity: g.quantity 
                        })
                    ));
                })
                .then((res) => setCart(res))
                .catch((err) => {
                    toast.error('Error al obtener el carrito');
                });

            setUpdate(false);
        }
    }, [uid, cart, update]);

    const addGame = async (game, quantity) => {
        const copyCart = [...cart];

        if(isInCart(game.id)){
            await updateDoc(doc(db, 'cart', uid), {
                cart: copyCart.map((g) => g.id === game.id 
                    ? { ...g, quantity: g.quantity + quantity } 
                    : g
                )
            });
        } else{
            await setDoc(doc(db, 'cart', uid), {
                cart: [...copyCart, { ...game, quantity }]
            });
        }

        updateQT(db, uid, { total, quantity, totalAmount, price: game.price});
        setUpdate(true);
    };

    const removeGame = async (id) => {
        const copyCart = [...cart];
        await updateDoc(doc(db, 'cart', uid), {
            cart: arrayRemove(copyCart.find((g) => g.id === id 
                && updateQT(db, uid, { total, quantity: g.quantity, totalAmount, price: g.price}, '-')
            ))
        });

        setUpdate(true);
    };

    const clear = async () => {
        await updateDoc(doc(db, 'cart', uid), {
            cart: [],
            cartQuantity: 0,
            cartTotal: 0
        });

        setUpdate(true);
    };

    const isInCart = (id) => cart.find((game) => game.id === id);

    const createOrder = (bool) => setNewOrder(bool);

    const contextValue = {
        cart,
        total,
        totalAmount,
        addGame,
        removeGame,
        clear,
        isInCart,
        createOrder,
        newOrder
    };

    return ( 
        <Provider value={contextValue}>
            {children}
        </Provider>
    );
}
 
export default CartContext;