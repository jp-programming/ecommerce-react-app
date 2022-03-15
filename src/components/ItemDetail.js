const ItemDetail = ({ game }) => {
    
    return ( 
        <div className="itemDetail">
            <img className="itemDetail__image" src={game.img} alt="Imagen de videojuego" />
            <div className="itemDetail__info">
                <h3>{game.name}</h3>
                <span>Género: {game.genre}</span>
                <span>${game.price}</span>
                <span>Plataformas: { 
                    game.platform?.reduce((previousName, currentName) => 
                        `${previousName}, ${currentName}`.toUpperCase()) }
                </span>
                <span>Stock: {game.stock}</span>
            </div>
        </div>
    );
}
 
export default ItemDetail;