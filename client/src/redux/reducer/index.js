import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_GENERES,
  GET_BY_NAME,
  FILTER_BY_CREATED,
  FILTER_BY_GENRES,
  FILTER_BY_SORT_NAME,
  FILTER_BY_RATING,
  VIDEOGAME_DETAIL,
  CREATE_VIDEOGAME,
} from "../actions";

const initialState = {
  games: [],
  genres: [],
  game: {},
  gamesrendered: [],
  response: null,
  loading: false
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        games: action.payload,
        gamesrendered: action.payload,
        loading:false
      };
    case GET_ALL_GENERES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        gamesrendered: action.payload,
        loading:false,
      };
    case VIDEOGAME_DETAIL:
      return {
        ...state,
        game: action.payload,
        loading:false,
      };
    case FILTER_BY_CREATED:
      const filterSelected =
        action.payload === "API"
          ? state.games.filter((e) => typeof e.id === "number")
          : state.games.filter((e) => typeof e.id === "string");
      return {
        ...state,
        gamesrendered: filterSelected,
      };
    case FILTER_BY_SORT_NAME:
      const filterAlphabetical =
        action.payload === "A-Z"
          ? state.gamesrendered.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
              return 0;
            })
          : state.gamesrendered.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
              return 0;
            });
      return {
        ...state,
        gamesrendered: filterAlphabetical,
      };

    case FILTER_BY_RATING:
      const filterRating =
        action.payload === "Mayor Valorado"
          ? state.gamesrendered.sort((a, b) => {
              return b.rating - a.rating;
            })
          : state.gamesrendered.sort((a, b) => {
              return a.rating - b.rating;
            });
      return {
        ...state,
        gamesrendered: filterRating,
      };

    case FILTER_BY_GENRES:
      return {
        ...state,
         // eslint-disable-next-line
        gamesrendered: state.gamesrendered.filter((e) => { 
          for(const g of e.generos){
            if(g.name === action.payload) return g
          }
        })
      }

      case CREATE_VIDEOGAME:
        return{
          ...state,
          response: action.payload,
        }

      case "LOADING":
        return {
          ...state,
          loading: true
        }
        
        // case "RESPONSE":
        //   return {
        //     ...state,
        //     response: false
        //   }
    
        
      
    default:
      return { ...state };
  }
}
