import { PIN, ROOT_CHANGED } from '../constants/actionTypes';

export function changeAppRoot(root) {
  return { type: ROOT_CHANGED, root };
}

export function appInitialized() {
  return (dispatch) => {
    dispatch(changeAppRoot(PIN));
  };
}
