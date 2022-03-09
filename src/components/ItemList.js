import Item from "./Item";

const ItemList = ({games}) => {
    return ( 
        <div className="itemList">
            {
                games.map((game) => {
                    return <Item key={game.id} game={game}/>
                })
            }
        </div>
    );
}
 
export default ItemList;