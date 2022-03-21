import { useState } from "react";

const ItemCount = ({ initial, stock, onAdd }) => {
    const [ count, setCount ] = useState(initial);
    
    return ( 
        <div className="itemCount">
            <div className="itemCount__buttons">
                <button className="itemCount__decreaseBtn" onClick={() => {
                    if( count > initial ) setCount(count-1);
                }}>-</button>
                <span>{count}</span>
                <button className="itemCount__increaseBtn" onClick={() => {
                    if( count < stock) setCount(count+1);
                }}>+</button>
            </div>
            <button className="itemCount__addBtn" onClick={() => onAdd(count)}>Agregar al carrito</button>
        </div>
    );
}
 
export default ItemCount;