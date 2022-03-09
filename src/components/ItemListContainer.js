import { useState, useEffect } from "react";
import ItemCount from "./ItemCount";
import ItemList from "./ItemList";

const games = [
    {
        id: 1,
        name: 'God of War',
        img: 'https://cdn.cdkeys.com/500x706/media/catalog/product/e/g/egs_godofwar_santamonicastudio_s2_1200x1600-fbdf3cbc2980749091d52751ffabb7b7_1.jpg',
        genre: 'Adventure-Action',
        price: 39.99
    },
    {
        id: 2,
        name: 'Minecraft',
        img: 'https://cdn.cdkeys.com/700x700/media/catalog/product/m/i/minecraft_xbox_one.jpg',
        genre: 'Sandbox',
        price: 19.99
    },
    {
        id: 3,
        name: 'Red Dead Redemption 2',
        img: 'https://s1.gaming-cdn.com/images/products/5679/orig/red-dead-redemption-2-pc-game-rockstar-cover.jpg',
        genre: 'Adventure-Action',
        price: 49.99
    },
];

const gamesPromise = new Promise((res, rej) => {
    setTimeout(() => {
        res(games);
    },2000);
});

const ItemListContainer = ({greeting}) => {
    const [ games, setGames ] = useState([]);

    useEffect(() => {
        gamesPromise
            .then((data) => setGames(data))
            .catch((err) => console.log(err));
    }, []);
    
    const onAdd = () => {
        console.log('Producto añadido');
    };

    return (  
        <div className="itemListContainer">
            <h2>{greeting}</h2>
            <ItemList games={games} />
            {/* <ItemCount initial={1} stock={5} onAdd={onAdd} /> */}
        </div>
    );
}
 
export default ItemListContainer;