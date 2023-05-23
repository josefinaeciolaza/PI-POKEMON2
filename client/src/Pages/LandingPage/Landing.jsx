import React from "react";
import { useNavigate } from "react-router-dom";
import './Landing.css'


export default function LandingPage (){
    const navigate = useNavigate();

    function handleClick() {
      navigate('/home');
    }
    return (
        <div className="landin">
        <button onClick={handleClick} className="pokemon-button">
        Let's start
        </button>
        </div>
    );
};