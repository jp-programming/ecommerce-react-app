import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

const CartWidget = () => {
    const { total } = useCart();

    return (
        total
        ?   <Link className="cartWidget" to="/cart">
                <FontAwesomeIcon icon="fa-solid fa-cart-shopping" /> 
                <span>{total}</span>
            </Link>
        :   <></>
    )
}

export default CartWidget;