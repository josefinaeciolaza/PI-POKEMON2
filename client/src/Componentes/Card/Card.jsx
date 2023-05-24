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
      <div className="types">
        {pokemon.types.map((type) => (
        <div className="type">
        {type.name || type}
        </div>
      ))}
      </div>
    </div>
  );
}
