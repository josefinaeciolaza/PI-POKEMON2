import { ALL_POKEMONS, GET_BY_NAME, GET_DETAIL, CLEAR_DETAIL, GET_TYPES, ADD_POKEMON, FILTER_ORIGIN, FILTER_TYPE, ORDER_ALPA, ORDER_ATTACK } from "./actions";

const initialState = {
  pokemons: [], // todos lo pokemons 
  allPokemons: [], //cards y name, renderizacion
  idPokemon: [],
  types: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POKEMONS:
      return {
        ...state,
        pokemons: action.payload,
        allPokemons: action.payload 
      };
    case GET_BY_NAME:
      return {
        ...state,
        allPokemons: action.payload
      };
    case GET_DETAIL:
      return {
        ...state,
        idPokemon: action.payload
      };
    case CLEAR_DETAIL:
      return {
        ...state,
        idPokemon: [],
      };
    case GET_TYPES:
      return {
        ...state,
        types: action.payload,
      };
    case ADD_POKEMON:
      return {
        ...state,
        pokemons: action.payload
      };
    case FILTER_ORIGIN:
      const { payload } = action;
      let pokemons = state.pokemons; 
      let filteredPokemons;

      if (payload === "") {
        // Si se selecciona la opción "Todos", mostrar todas las cards sin filtro
        filteredPokemons = pokemons;
      } else {
        // Aplicar el filtro según el origen seleccionado
        filteredPokemons = payload === "api" ? pokemons.filter(p => !isNaN(p.id)) : pokemons.filter(p => isNaN(p.id));
      }
      return {
        ...state,
        allPokemons: filteredPokemons
      };
    case FILTER_TYPE:
        const pokemonsByType = state.allPokemons;
        const filterByType =
        action.payload === 'all'
        ? pokemonsByType
        : pokemonsByType.filter((p) => {
           const typeV = p.types.some(types => {
            const tipo = types.name || types
            return tipo === action.payload
          })
          return typeV;
        })
        // const pokemonsType = state.pokemons
        // const filterByType = pokemonsType.filter((pokemon)=> pokemon.types.some((type)=> type.name === action.payload)
        // )
    return {
        ...state,
        allPokemons: filterByType
      };
      case ORDER_ALPA:
      let pokeAlpa = [...state.allPokemons]; // Hacer una copia del array pokemons
      pokeAlpa.sort((a, b) => {
        if (a.name < b.name) {
          return action.payload === 'ASCENDENT' ? -1 : 1;
        }
        if (a.name > b.name) {
          return action.payload === 'DESCENDENT' ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        allPokemons: pokeAlpa
      };
      case ORDER_ATTACK:
        let pokeAttack = [...state.allPokemons];
        pokeAttack.sort((a, b) => {
            if (a.attack < b.attack) {  
              return action.payload === 'LESS' ? -1 : 1; 
            }
            if (a.attack > b.attack) {  
              return action.payload === 'MORE' ? -1 : 1;
            }
            return 0;
        });
        return {
          ...state,
          allPokemons: pokeAttack
        };
    default:
      return state;
  }
};

export default reducer;
