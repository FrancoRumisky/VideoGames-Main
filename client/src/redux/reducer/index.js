import {
  GET_ALL_VIDEOGAMES,
  GET_ALL_GENERES,
  GET_BY_NAME,
  FILTER_BY_CREATED,
  FILTER_BY_GENRES,
  FILTER_BY_SORT_NAME,
  ORDER_BY_RATING,
  VIDEOGAME_DETAIL,
  CREATE_VIDEOGAME,
} from "../actions";

const initialState = {
  games: [],
  genres: [],
  game: {},
  gamesrendered: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_VIDEOGAMES:
      return {
        ...state,
        games: action.payload,
        gamesrendered: action.payload,
      };
    case GET_ALL_GENERES:
      return {
        ...state,
        genres: action.payload,
      };
    case GET_BY_NAME:
      return {
        ...state,
        gamesrendered: action.payload
      };
    case VIDEOGAME_DETAIL:
      return {
        ...state,
        game: action.payload
      };
    case FILTER_BY_CREATED:
      const FilterSelected = action.payload === "DB" ? state.games.filter(e=> e.id) : state.games.filter(e=> !e.id)
      return {
        ...state,
        gamesrendered: FilterSelected
      };
      default:  return {...state}
  }
}
