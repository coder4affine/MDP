import * as types from '../constants/actionTypes';

const initialState = {
  pin: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_PIN:
      return { ...state, pin: action.pin };

    default:
      return state;
  }
};
