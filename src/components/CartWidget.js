import { Link } from "react-router-dom";

const CartWidget = () => {
    return (
        <Link className="cartWidget" to="/cart">
            <i className="fa-solid fa-cart-shopping cartWidget"></i>
        </Link>
    )
}

export default CartWidget;