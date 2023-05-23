import React from "react";
import { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPokemons } from "../../Redux/actions";
import Card from "../Card/Card";
import "./List.css"

export default function CardList(){
    
const dispatch = useDispatch();
const pokemons = useSelector((state) => state.allPokemons)

useEffect(()=> {
    dispatch(getPokemons())
}, [dispatch])

return(

  <div className="pokemonList">
    {Array.isArray(pokemons) ? (
      pokemons.map((pokemon) => (
        <Card key={pokemon.id} pokemon={pokemon} />
      ))
    ) : (
      <p>No se encontraron resultados</p>
    )}
  </div>
)
};
