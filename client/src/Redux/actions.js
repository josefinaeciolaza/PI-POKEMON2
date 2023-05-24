import axios from 'axios'

export const ALL_POKEMONS = "ALL_POKEMONS";
export const GET_BY_NAME = "GET_BY_NAME";
export const GET_DETAIL = "GET_DETAIL";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const GET_TYPES = "GET_TYPES";
export const ADD_POKEMON = "ADD_POKEMON";
export const FILTER_ORIGIN = "FILTER_ORIGIN";
export const FILTER_TYPE = "FILTER_TYPE";
export const ORDER_ALPA = "ORDER_ALPA";
export const ORDER_ATTACK = "ORDER:ATTACK";
export const CLEAR_F_O = "CLEAR_F_O";


export function getPokemons (){
    return async function(dispatch){
        const response = await axios('http://localhost:3001/pokemons')
        return dispatch({
            type: ALL_POKEMONS,
            payload: response.data
        })
    }
};

export function getByName (name){
    return async function(dispatch){
        try {
          const response = await axios(`http://localhost:3001/pokemons?name=${name}`)
        
          return dispatch({
              type: GET_BY_NAME,
              payload:[response.data]
          })
      
        } catch (error) {
          console.log(error.message);
        }
      }
};

export function getDetail (id){
    return async function(dispatch){
        try {
        const response = await axios(`http://localhost:3001/pokemons/${id}`)
        return dispatch({
            type: GET_DETAIL,
            payload: response.data
          })
        } catch (error) {
            console.log(error);  
        }
    }
}

export const clearDetail = () => ({
    type: CLEAR_DETAIL,
  });

  export const getTypes = () => {
    return async function (dispatch) {
        try {
          const response = await axios(`http://localhost:3001/types`);
          dispatch({ 
            type: GET_TYPES,
             payload: response.data 
            });
        } catch (error) {
          console.log("Get pokemon types:", error);
        }
      };
  };

  export const addPokemon = (payload) => {
    return async function (dispatch){
        try {
          await axios.post('http://localhost:3001/pokemons', payload);
            return dispatch({ 
                type: ADD_POKEMON, 
            });
          } catch (error) {
            console.log(error.message);
          }
    }
  };

  export const clearFO = () => {
    return{
      type: CLEAR_F_O
    }
  };
  
export const filterOrigin = (payload) => {
  return{
    type: FILTER_ORIGIN,
    payload: payload
  }
};

export const filterType = (payload) => {
  console.log(payload);
  return{
    type: FILTER_TYPE,
    payload: payload
  }
}

export const orderAlpa = (payload) => {
  return {
    type: ORDER_ALPA,
    payload: payload
  }
};

export const orderAttack = (payload) => {
  return {
    type: ORDER_ATTACK,
    payload: payload
  }
};