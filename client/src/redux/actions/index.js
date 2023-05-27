export const GET_ALL_VIDEOGAMES = "GET_ALL_VIDEOGAMES";
export const GET_ALL_GENERES = "GET_ALL_GENERES";
export const GET_BY_NAME = "GET_BY_NAME";
export const FILTER_BY_CREATED = "FILTER_BY_CREATED";
export const FILTER_BY_GENRES = "FILTER_BY_GENRES";
export const FILTER_BY_SORT_NAME = "FILTER_BY_SORT_NAME";
export const FILTER_BY_RATING = "FILTER_BY_RATING";
export const VIDEOGAME_DETAIL = "VIDEOGAME_DETAIL";
export const CREATE_VIDEOGAME = "CREATE_VIDEOGAME";

const BACKEND_SERVER =
  process.env.REACT_APP_BACKEND_SERVER || "http://localhost:3001";

export function getAllVideogames() {
  return function (dispatch) {
    dispatch(loading());
    return fetch(BACKEND_SERVER + "/videogames")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_ALL_VIDEOGAMES, payload: json });
      });
  };
}
export function getAllGenres() {
  return function (dispatch) {
    return fetch(BACKEND_SERVER + "/genres")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_ALL_GENERES, payload: json });
      });
  };
}
export function videoGameDetail(id) {
  return function (dispatch) {
    dispatch(loading());
    return fetch(BACKEND_SERVER + "/videogames/" + id)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: VIDEOGAME_DETAIL, payload: json });
      });
  };
}

export function getByName(name) {
  return function (dispatch) {
    dispatch(loading());
    return fetch(BACKEND_SERVER + `/videogames?name=${name}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: GET_BY_NAME, payload: json });
      })
      .catch((err) => {
        dispatch({ type: GET_BY_NAME, payload: err });
      });
  };
}

export function filterByCreated(payload) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY_CREATED, payload });
  };
}

export function filterBySortName(payload) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY_SORT_NAME, payload });
  };
}

export function filterByRating(payload) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY_RATING, payload });
  };
}

export function filterByGenres(payload) {
  return function (dispatch) {
    dispatch({ type: FILTER_BY_GENRES, payload });
  };
}

export function createVideogame(payload) {
  return function (dispatch) {
    return fetch(BACKEND_SERVER + "/videogames", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((json) => dispatch({ type: CREATE_VIDEOGAME, payload: json }))
      .catch((err) => {
        dispatch({ type: CREATE_VIDEOGAME, payload: err });
      });
  };
}

export function loading() {
  return { type: "LOADING" };
}

// export function setResponse() {
//   return {type:"RESPONSE"}
// }
