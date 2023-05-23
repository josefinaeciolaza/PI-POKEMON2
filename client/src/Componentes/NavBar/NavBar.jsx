import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { filterOrigin, filterType, getTypes, orderAlpa, orderAttack } from "../../Redux/actions";
import { useSelector } from "react-redux";
import './NavBar.css';
import SearchBar from "../SearchBar/searchBar";
import { useNavigate } from "react-router-dom";


export default function NavBar (){

    const typesALL = useSelector((state) => state.types);

    const dispatch = useDispatch();
     
    const navigate = useNavigate();

    function handleClick(){
        navigate('/pokemon/create')
    };

    useEffect(() => {
        dispatch(getTypes());
      }, [dispatch]);
      

    const handleFilterChange = (e) => {
      const value = e.target.value;
      dispatch(filterOrigin(value));
    };
    
    const handleFilterTypeChange = (e) => {
        const value = e.target.value;
        dispatch(filterType(value));
      };
    
    const handleOrderAlpha = (e) => {
      const value = e.target.value;
      dispatch(orderAlpa(value))
    };

    const handleOrderAttack = (e) => {
      const value = e.target.value;
      dispatch(orderAttack(value))
    };
 
    return (
        <div className="divNav">
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
            <SearchBar/>
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
            <button onClick={handleClick} className="botonCreat">Create pokemon</button>
        </div>

      );
};
