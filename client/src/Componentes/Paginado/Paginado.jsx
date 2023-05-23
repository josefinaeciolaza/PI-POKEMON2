import React from "react";
import { useSelector } from "react-redux";

export default function Paginado ({paginacion, perPage, currentPage }){
    const totalPokemons = useSelector((state) => state.allPokemons);
    const totalPages = Math.ceil(totalPokemons.length / perPage);
    
    const pageNumbers = []; //Almaceno los numeros de pag que se mostraran
    const maxPagesToShow = 4;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2)); //Me aseguro que la pagina de inicio no sea menor a 1
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1); // Me aseguro que el numero de pagina no sea mayor al maximo a mostrar
  
    if(endPage - startPage + 1 < maxPagesToShow){ //Verifico si el num de pag a mostrar es menos a maxPagesToShow
      startPage = Math.max(1, endPage - maxPagesToShow + 1); //Si es así, que muestre la cantidad necesaria para cumplir con la cantidad max permitida
    }
  
    //Hago un bucle para ir agregando cada num de pag al array pageNumbers y generar una lista para navegar por páginas
    for(let i = startPage; i <= endPage; i++){
      pageNumbers.push(i);
    }
  
    const handleClick = (page) => {
      paginacion(page);
    };
  
    return (
      <div >
        {currentPage >= 22 ? (
          <h1>¡Lo sentimos, no hay más pokemones!</h1>
        ) : (
          <>
            <button
              onClick={() => handleClick(currentPage - 1)}
              disabled={currentPage === 1}
            >
             Prev
            </button>
  
            {pageNumbers.map((number) => (
              <div key={number}>
                <button
                  onClick={() => handleClick(number)}
                >
                  {number}
                </button>
              </div>
            ))}
  
            <button
              onClick={() => handleClick(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
            Next
            </button>
          </>
        )}
      </div>
    );
  };