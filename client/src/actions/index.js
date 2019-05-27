import axios from 'axios';

// see what url we are on, if localhost, use localhost root url
const currentURL = window.location.hostname;
let ROOT_URL = 'https://dj-watson.herokuapp.com';

if (currentURL.indexOf('localhost') >= 0) {
  ROOT_URL = 'http://localhost:9090';
  // ROOT_URL = 'https://left-on-read.herokuapp.com/api';
}

export const ActionTypes = {
  SET_URI: 'SET_URI',
  GET_SONGS: 'GET_SONGS',
  GET_ORDERED: 'GET_ORDERED',
  CLEAR_DATA: 'CLEAR_DATA',
};


export function setURI(uri) {
  return {
    type: ActionTypes.SET_URI,
    payload: uri,
  };
}

export function getOrdered(dispatch, tracks) {
  axios.post(`${ROOT_URL}/dj`, { tracks })
    .then((response) => {
      dispatch({
        type: ActionTypes.GET_ORDERED,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error);
    });
}

export function getSongs(uri) {
  return (dispatch) => {
    axios.get(`${ROOT_URL}/songs?uri=${uri}`)
      .then((response) => {
        dispatch({
          type: ActionTypes.GET_SONGS,
          payload: response.data,
        });

        const ids = response.data.map(v => v.id);
        getOrdered(dispatch, ids);
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function clearData() {
  return {
    type: ActionTypes.CLEAR_DATA,
    payload: {},
  };
}
