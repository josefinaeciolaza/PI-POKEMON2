import React from "react";
import Detail from "../../Componentes/Detalle/Detail";
import { useNavigate } from "react-router-dom";
import './Detail.css'

export default function PageDetail (){
    const navigate = useNavigate();

    function handleClick(){
        navigate('/home')
    };
    return(
        <div>
        <button className="custom-button" onClick={handleClick}>Home</button>
           <Detail/>
        </div>
    )
};