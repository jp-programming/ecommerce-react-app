import NavBar from "./components/NavBar";
import ItemListContainer from "./components/ItemListContainer";

const App = () => {
    return (
        <>
            <NavBar/>
            <ItemListContainer greeting="Productos disponibles"/>
        </>
    );
}

export default App;
