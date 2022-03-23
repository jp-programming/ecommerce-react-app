import { useContext } from "react";
import { Link } from "react-router-dom";

import { cartContext } from "./CartContext";

const CartWidget = () => {
    const { total } = useContext(cartContext);

    return (
        total
        ?   <Link className="cartWidget" to="/cart">
                <i className="fa-solid fa-cart-shopping cartWidget"> <span>{total}</span></i>
            </Link>
        :   <></>
    )
}

export default CartWidget;