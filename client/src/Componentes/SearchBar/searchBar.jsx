import React, { useState} from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../Redux/actions";
import './serchBar.css'

export default function SearchBar (){
    const dispatch = useDispatch();

    const [search, setSearch] = useState("");

    const handleInput = (e) => {
        e.preventDefault()
        setSearch(e.target.value)
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault()
    //     dispatch(getByName(search));
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getByName(search)).then((result) => {
          if (!result) {
            // Si el resultado es falso, el Pokémon no se encontró
            alert("No se encontró ningún Pokémon con ese nombre.");
          }
        });
      };
    return(
        <div className="search-container">
        <form>
            <input type="text" className="search-input" onChange={handleInput} placeholder="Busqueda" />
            <button type="submit" className="search-button" onClick={handleSubmit}>Buscar</button>
        </form>

        </div>
    )
};