import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getDetail } from "../../Redux/actions";
import './DetaCard.css'

export default function Detail (){

    const detail = useSelector((state) => state.idPokemon)
    const {id} = useParams()
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    if (!detail) {
        return <div>Cargando...</div>;
      }

    return(
        // <div className="pokemon-detail">
        //     <img src={detail.image} alt={detail.name} />
        //     <h2>{detail.name}</h2>
        //     <h2>ID: {detail.id}</h2>
        //     <h3>Hit Points: {detail.hp}</h3>
        //     <h3>Height: {detail.height}</h3>
        //     <h3>Weight: {detail.weight}</h3>
        //     <h3>Speed: {detail.speed}</h3>
        //     <h3>Attack: {detail.attack}</h3>
        //     <h3>Defense: {detail.defense}</h3>
        //       {detail.types && (
        //     <div>
        //       {Array.isArray(detail.types) ? (
        //     // Si detail.types es un array
        //       detail.types.map((type, index) => (
        //     <div key={index} className="type">
        //         {type.name || type}
        //     </div>
        //       ))
        //       ) : (
        //     // Si detail.types no es un array, asumir que es un objeto con estructura { name: 'tipo' } NO LO USO.
        //     <div className="type">
        //       Type: {detail.types.name}
        //     </div>
        //     )}
        //     </div>
        //     )}
        // </div>
  <div className="pokemon-detail">
  <div className="image-container">
    <img src={detail.image} alt={detail.name} />
  </div>
  <div className="text-container">
    <h2>{detail.name}</h2>
    <h2>ID: {detail.id}</h2>
    <h3>Hit Points: {detail.hp}</h3>
    <h3>Height: {detail.height}</h3>
    <h3>Weight: {detail.weight} KG</h3>
    <h3>Speed: {detail.speed}</h3>
    <h3>Attack: {detail.attack}</h3>
    <h3>Defense: {detail.defense}</h3>
    {detail.types && (
      <div>
        {Array.isArray(detail.types) ? (
          detail.types.map((type, index) => (
            <div key={index} className="type">
              {type.name || type}
            </div>
          ))
        ) : (
          <div className="type">
            Type: {detail.types.name}
          </div>
        )}
      </div>
    )}
  </div>
</div>
    )
};