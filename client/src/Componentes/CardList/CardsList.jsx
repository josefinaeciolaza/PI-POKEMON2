import React from "react";
import { useEffect} from "react";
import { useDispatch} from "react-redux";
import { getPokemons } from "../../Redux/actions";
import Card from "../Card/Card";
import "./List.css"

export default function CardList({currentPoke}){
    
const dispatch = useDispatch();
//const pokemons = useSelector((state) => state.allPokemons)

useEffect(()=> {
    dispatch(getPokemons())
}, [dispatch])

return(

  <div className="pokemonList">
    {currentPoke.map((pokemon) => (
      <Card key={pokemon.id} pokemon={pokemon} />
    ))}
  </div>
)
};
