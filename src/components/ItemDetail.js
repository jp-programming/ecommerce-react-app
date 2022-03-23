import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import ItemCount from "./ItemCount";
import { cartContext } from "./CartContext";

const ItemDetail = ({ game }) => {
    const [ quantity, setQuantity ] = useState(0);

    const { addGame } = useContext(cartContext);

    const onAdd = (q) => {
        setQuantity(q);
    };

    return ( 
        <div className="itemDetail">
            <img className="itemDetail__image" src={game.img} alt="Imagen de videojuego" />
            <div className="itemDetail__info">
                <h3>{game.name}</h3>
                <span>Género: {game.genre}</span>
                <span><b>${game.price}</b></span>
                <span>Plataformas: { 
                        game.platform?.reduce((previousName, currentName) => 
                            `${previousName}, ${currentName}`.toUpperCase())
                    }
                </span>
                <span>Stock: {game.stock}</span>
                {
                    quantity 
                    ? <Link onClick={() => addGame(game, quantity)} className="itemDetail__finishButton" to="/cart" >Terminar compra</Link>
                    : <ItemCount initial={1} stock={game.stock} onAdd={onAdd} />
                }
            </div>
        </div>
    );
}
 
export default ItemDetail;