import React from "react";
import './paginado.css'

export default function Paginado({perPage, totalPoke, paginado, currentPage}){
    const pageNumbers=[] 
    for (let i=1 ; i<= Math.ceil(totalPoke /perPage) ; i++){
        pageNumbers.push(i)
    }

    return (
      <nav className="paginado-items">
      <ul className="paginado-list">
        {pageNumbers.map((n) => (
          <li key={n}>
            <button className={n === currentPage ? "active" : ""} onClick={() => paginado(n)}>
              {n}
            </button>
          </li>
        ))}
      </ul>
    </nav>
    )
}