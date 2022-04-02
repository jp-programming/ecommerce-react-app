import { toast } from "react-toastify";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ItemDetail from "./ItemDetail";

import { db } from "../Firebase";
import { doc, getDoc } from "firebase/firestore";

const ItemDetailContainer = () => {
    const [ game, setGame ] = useState({});
    const { id } = useParams();

    useEffect(() => {
        toast.loading('Cargando producto');
    
        const docRef = doc(db, 'games', id);
        const docSnap = getDoc(docRef);
        
        docSnap
            .then((snapshot) => {
                const game = {
                    id: snapshot.id,
                    ...snapshot.data()
                }

                setGame(game);
                toast.dismiss();
            })
            .catch((err) => {
                toast.dismiss();
                toast.error('Error al cargar el producto');
            });
    }, [id]);

    return ( 
        <div className="itemDetailContainer">
            <ItemDetail game={game}/>
        </div>
    );
}
 
export default ItemDetailContainer;