import React from "react";
import "./Card.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { clearDetail } from "../../Redux/actions";

export default function Card({ pokemon }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleClick(){
    dispatch(clearDetail())
    navigate(`/pokemon/${pokemon.id}`)
}

  return (
    <div className="card-container" onClick={handleClick}>
         <div className="image-wrapper">
        <img className="img" src={pokemon.image} alt={pokemon.name} />
      </div>
      <h2> {pokemon.name}</h2>
      {/* <div className="types">
        {pokemon.types.map((types, index) => (
          <div key={index}>Type: {types}</div>
        ))}
      </div> */}
      {/* <div className="types">
  {Array.isArray(pokemon.types) ? (
      // Si pokemon.types es un array, renderizar los tipos como lo haces normalmente
    pokemon.types.map((type, index) => (
      <div key={index} className="type">
        Type: {type}
      </div>
    ))
  ) : (
    // Si pokemon.types es un objeto con una estructura diferente, adaptar la forma de mostrar los tipos
    Object.values(pokemon.types).map((type, index) => (
      <div key={index} className="type">
        Type: {type.name}
      </div>
    ))
  )}
</div> */}
      {/* <div className="types">
        {pokemon.types.map((types, index) => (
          <div key={index} className="type">
            Type: {types.name}
          </div>
        ))}
      </div> */}
      <div className="types">
  {Array.isArray(pokemon.types) ? (
    // Si pokemon.types es un array
    pokemon.types.map((type, index) => (
      <div key={index} className="type">
       {type.name || type}
      </div>
    ))
  ) : (
    // Si pokemon.types no es un array, asumo que es un objeto con estructura { name: 'tipo' }
    <div className="type">
      Type: {pokemon.types.name}
    </div>
  )}
</div>
    </div>
  );
}
