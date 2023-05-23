// import React, {useState} from "react";
// import CardList from "../../Componentes/CardList/CardsList";
// //import { useNavigate } from "react-router-dom";
// import NavBar from "../../Componentes/NavBar/NavBar";
// import { useSelector } from "react-redux";
// import Paginado from "../../Componentes/Paginado/Paginado";

// export default function Home (){

//     const allPokemons = useSelector((state) => state.allPokemons)

// const [currentPage, setCurrentPage] = useState(1); //PAGINA ACTUAL.
// const [perPage, setPerPage] = useState(12); //CUANTO POKEMONS POR PAG.

// //FUNCION PARA MANEJAR EL CAMBIO DE PAGINA
// const paginacion = (pageNumber) => { //PageNumbers es el número de página al que se desea cambiar
//     setPerPage(pageNumber === 1 ? 12 : 12); //que siempre sean 12 las card  por pag.
//     setCurrentPage(pageNumber) //se actualiza el estado de currentPage utilizando setCurrentPage con el valor de pageNumber. Esto cambia la página actual a la página seleccionada.
// }
// // calcula el índice del último pokémon en la página actual
// const indexOfLast = currentPage === 1 ? currentPage * perPage : currentPage * perPage - 1; 
// //calcular el índice del primer pokémon en la página actual
// const indexOfFirst = indexOfLast - perPage;
//     //Renderizo la lista de pokemones paginada
//     const currentPokemons = allPokemons.slice(indexOfFirst, indexOfLast);

//     return (
//         <div>
        
//             <NavBar />
//             <CardList pokemons={currentPokemons} />
//             <Paginado paginacion={paginacion} perPage={perPage} currentPage={currentPage} setCurrentPage={setCurrentPage}   />
//         </div>
//     )
// };}
import React, { useState } from "react";
import CardList from "../../Componentes/CardList/CardsList";
import NavBar from "../../Componentes/NavBar/NavBar";
import { useSelector } from "react-redux";
import Paginado from "../../Componentes/Paginado/Paginado";

export default function Home() {
  const allPokemons = useSelector((state) => state.allPokemons);

  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(12);

  const paginacion = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLast = currentPage * perPage;
  const indexOfFirst = indexOfLast - perPage;
  const currentPokemons = allPokemons.slice(indexOfFirst, indexOfLast);

  return (
    <div>
      <NavBar />
      <CardList pokemons={currentPokemons} />
      <Paginado
        paginacion={paginacion}
        perPage={perPage}
        currentPage={currentPage}
      />
    </div>
  );
}
