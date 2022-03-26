import { useNavigate } from "react-router-dom";
import Item from "./Item";

const ItemList = ({ games }) => {
    const navigate = useNavigate();

    const routeChange = (id) => {
        const path = `/game/${id}`;
        navigate(path);
    };

    return ( 
        <div className="itemList">
            {
                games.map((game) => {
                    return <Item routeChange={routeChange} key={game.id} game={game}/>
                })
            }
        </div>
    );
}
 
export default ItemList;