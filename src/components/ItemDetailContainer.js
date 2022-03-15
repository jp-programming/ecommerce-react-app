import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";
import ItemCount from "./ItemCount";

import { gamesArr } from "../data";

const ItemDetailContainer = () => {
    const [ game, setGame ] = useState({});
    const { name } = useParams();

    useEffect(() => {
        const gamePromise = new Promise((res, rej) => {
            toast.loading('Cargando producto');
            setTimeout(() => {
                res(gamesArr.find((game) => (game.name.toLowerCase()) === (name.toLowerCase().replaceAll('_', ' '))) );
            }, 2000);
        });
        
        gamePromise
            .then((data) => {
                setGame(data);
                toast.dismiss();
            })
            .catch((err) => {
                toast.dismiss();
                toast.error('Error al cargar el producto');
            });
    }, [name]);

    return ( 
        <div className="itemDetailContainer">
            <ItemDetail game={game}/>
            <ItemCount initial={1} stock={game.stock}/>
        </div>
    );
}
 
export default ItemDetailContainer;