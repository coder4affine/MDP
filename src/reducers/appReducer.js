// @flow
import * as types from '../constants/actionTypes';

const initialState = {
  root: undefined,
};

export default (state: any = initialState, action: any) => {
  switch (action.type) {
    case types.ROOT_CHANGED:
      return { ...state, root: action.root };

    default:
      return state;
  }
};
