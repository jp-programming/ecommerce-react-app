import { createContext, useState } from "react";

export const cartContext = createContext();
const { Provider } = cartContext; 

const CartContext = ({ children }) => {
    const [ cart, setCart ] = useState([]);
    const [ total, setTotal ] = useState(0);
    const [ totalAmount, setTotalAmount ] = useState(0);

    const addGame = (game, quantity) => {
        if(isInCart(game.id)){
            const copyCart = [...cart];
            setCart(copyCart.map((g) => g.id === game.id 
                ? {...g, quantity: g.quantity + quantity} 
                : g
            ));
        } else{
            setCart([...cart, {...game, quantity}])
        }

        setTotal(total+quantity);
        setTotalAmount(Number((totalAmount + (game.price * quantity)).toFixed(2)));
    };

    const removeGame = (id) => {
        const copyCart = [...cart];
        setCart(copyCart.filter((game) => 
            game.id !== id || 
            (
                setTotal(total-game.quantity), 
                setTotalAmount(Number((totalAmount - (game.price * game.quantity)).toFixed(2))) 
            ) 
        ));
    };

    const clear = () => {
        setCart([])
        setTotal(0);
        setTotalAmount(0);
    };

    const isInCart = (id) => cart.find((game) => game.id === id);

    const contextValue = {
        cart,
        total,
        totalAmount,
        addGame,
        removeGame,
        clear,
        isInCart
    }

    return ( 
        <Provider value={contextValue}>
            {children}
        </Provider>
    );
}
 
export default CartContext;