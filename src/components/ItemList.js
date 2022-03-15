import { useNavigate } from "react-router-dom";
import Item from "./Item";

const ItemList = ({games}) => {
    const navigate = useNavigate();

    const routeChange = (e) => {
        const path = `/game/${e.currentTarget.children[1].innerText.replaceAll(' ', '_')}`;
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