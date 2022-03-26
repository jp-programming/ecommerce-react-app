import { toast } from "react-toastify";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemList from "./ItemList";

import { db } from "../Firebase";
import { getDocs, collection, query, where } from "firebase/firestore";

const ItemListContainer = ({greeting}) => {
    const [ games, setGames ] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        toast.loading('Cargando productos');

        const gameCollection = collection(db, 'games');
        const queryType = type 
            ? query(gameCollection, where('platform', 'array-contains', type))
            : gameCollection
        const documents = getDocs(queryType);

        documents
            .then((snapshot) => {
                const aux = snapshot.docs.map((doc) => 
                    ({
                        id: doc.id,
                        ...doc.data()
                    }) 
                );

                setGames(aux);
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