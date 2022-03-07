import ItemCount from "./ItemCount";

const ItemListContainer = ({greeting}) => {
    const onAdd = () => {
        console.log('Producto añadido');
    };

    return (  
        <div className="itemListContainer">
            <h2>{greeting}</h2>
            <ItemCount initial={1} stock={5} onAdd={onAdd} />    
        </div>
    );
}
 
export default ItemListContainer;