export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_GENERES = "GET_ALL_GENERES";
export const GET_BY_NAME = "GET_BY_NAME";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_BY_SORT_NAME = "FILTER_BY_SORT_NAME";
export const ORDER_BY_RATING = "ORDER_BY_RATING";
export const VIDEOGAME_DETAIL = "VIDEOGAME_DETAIL";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";

const url = "http://localhost:3001/";

export function getAllVideogames() {
  return function (dispatch) {
    return fetch(url + "videogames")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_ALL_VIDEOGAMES, payload: json });
      });
  };
}
export function getAllGenres() {
  return function (dispatch) {
    return fetch(url + "genres")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_ALL_GENERES, payload: json });
      });
  };
}
export function videoGameDetail(id) {
  return function (dispatch) {
    return fetch(url + id)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: VIDEOGAME_DETAIL, payload: json });
      });
  };
}
// export function getAllVideogames() {
//   return function (dispatch) {
//     return fetch(url + "videogames")
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({ type: GET_ALL_VIDEOGAMES, payload: json });
//       });
//   };
// }
// export function getAllVideogames() {
//   return function (dispatch) {
//     return fetch(url + "videogames")
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({ type: GET_ALL_VIDEOGAMES, payload: json });
//       });
//   };
// }
