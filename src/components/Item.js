const Item = ({game}) => {
    return ( 
        <div className="item">
            <img className="item__image" src={game.img} alt="Imagen de videojuego" />
            <h3>{game.name}</h3>
            <span>Género: {game.genre}</span>
            <span>${game.price}</span>
        </div>
    );
}
 
export default Item;