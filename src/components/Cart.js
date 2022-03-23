import { useContext } from "react";
import { Link } from "react-router-dom";

import { cartContext } from "./CartContext";

const Cart = () => {
    const { cart, totalAmount, removeGame, clear } = useContext(cartContext);

    return ( 
        <div className="cartContent">
            {
                cart.length > 0 
                ? <>
                    <button onClick={clear} className="cartContent__emptyButton">Vaciar carrito</button>
                    {
                        cart.map((game) => 
                            <div key={game.id} className="cartContent__info">
                                <img className="cartContent__image" src={game.img} alt="Imagen de videojuego" />
                                <div className="cartContent__detail">
                                    <h3>{game.name}</h3>
                                    <span>${game.price}</span>
                                    <span>Cantidad: {game.quantity} x {(game.price * game.quantity).toFixed(2)}</span>
                                </div>
                                <button onClick={() => removeGame(game.id)} className="cartContent__deleteButton">X</button>                
                            </div>
                        )
                    }
                    <span className="cartContent__total">Total: ${totalAmount}</span>
                </>
                : <div className="cartContent__empty"> 
                    <p className="cartContent__emptyMsg">
                        El carrito actualmente se encuentra vacío. 
                        Haga click en <b>Volver a Comprar</b> para ver los productos.
                    </p> 
                    <Link className="cartContent__linkToHome" to="/" >Volver a comprar</Link>
                </div> 
            }
        </div>
    );
}
 
export default Cart;