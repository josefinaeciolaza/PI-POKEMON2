import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { filterOrigin, filterType, getTypes, orderAlpa, orderAttack, clearRefresh } from "../../Redux/actions";
import { useSelector } from "react-redux";
import './NavBar.css';
import SearchBar from "../SearchBar/searchBar";
import pokemonLogo from '../../img/pokemonLogo.png'


export default function NavBar ({setCurrentPage}){

    const typesALL = useSelector((state) => state.types);

    const dispatch = useDispatch();
     


    useEffect(() => {
        dispatch(getTypes());
      }, [dispatch]);
      

    const handleFilterChange = (e) => {
      const value = e.target.value;
      dispatch(filterOrigin(value));
      setCurrentPage(1)
    };
    
    const handleFilterTypeChange = (e) => {
        const value = e.target.value;
        dispatch(filterType(value));
        setCurrentPage(1)
      };
    
    const handleOrderAlpha = (e) => {
      const value = e.target.value;
      dispatch(orderAlpa(value))
      setCurrentPage(1)
    };

    const handleOrderAttack = (e) => {
      const value = e.target.value;
      dispatch(orderAttack(value))
      setCurrentPage(1)
    };
 
    function handleRefresh(e){
      e.preventDefault();
      dispatch(clearRefresh());
  }
    return (
        <div className="divNav">
            <button className="refresh-button" onClick={handleRefresh}>
            <img src={pokemonLogo} alt="Pokémon Logo" className="refresh-logo" />
            </button>
              <select onChange={handleFilterChange} className="cambio">
                <option value="">Select creator</option>
                <option value="api">API</option>
                <option value="user">Usuario</option>
              </select>
              <select onChange={handleFilterTypeChange} className="cambio">
                <option value="" >Select type</option>
                <option value="all">All Pokemons</option>
                {typesALL.map((type) => ( //bucle map para generar las opciones de tipo basadas en el estado typesAll que se obtiene del store de Redux
                <option key={type.id} value={type.name}>
                {type.name}
                </option>
                ))}
            </select>
            <SearchBar setCurrentPage={setCurrentPage}/>
            <select onChange={handleOrderAlpha} className="cambio">
              <option value="">Order alphabetically</option>
              <option value='ASCENDENT'>A - Z</option>
              <option value='DESCENDENT'>Z - A</option>
            </select>
            <select onChange={handleOrderAttack} className="cambio">
              <option value=''>Sort by attack</option>
              <option value='MORE'>Biggest attack</option>
              <option value='LESS'>Less attack</option>
            </select>

        </div>

      );
};
