import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

import { gamesArr } from "../data";

const ItemListContainer = ({greeting}) => {
    const [ games, setGames ] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        const gamesPromise = new Promise((res, rej) => {
            toast.loading('Cargando productos');
        
            setTimeout(() => {
                res(type 
                        ? gamesArr.filter((game) => 
                            game.platform.find((platform) => platform === type))
                        : gamesArr
                );
            }, 2000);
        });

        gamesPromise
            .then((data) => { 
                setGames(data) 
                toast.dismiss();
            })
            .catch((err) => {
                toast.dismiss();
                toast.error('Error al cargar los productos');
            });
    }, [type]);

    return (  
        <div className="itemListContainer">
            <h2>{greeting}</h2>
            <ItemList games={games} />
        </div>
    );
}
 
export default ItemListContainer;