// keys for actiontypes
export const ActionTypes = {
  SET_URI: 'SET_URI',
};


export function setURI(uri) {
  return {
    type: ActionTypes.SET_URI,
    payload: uri,
  };
}
