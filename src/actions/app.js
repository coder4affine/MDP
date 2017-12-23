import { PIN, ROOT_CHANGED } from '../constants/actionTypes';

export function appInitialized() {
  return async function (dispatch, getState) {
    dispatch(changeAppRoot(PIN));
  };
}

export function changeAppRoot(root) {
  return { type: ROOT_CHANGED, root };
}
