import * as types from '../constants/actionTypes';

const initialState = {
  loading: false,
  error: '',
  pin: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_PIN || types.SET_PIN:
      return { ...state, loading: true };
    case types.LOAD_PIN_SUCCESS || types.SET_PIN_SUCCESS:
      return { ...state, loading: false, pin: action.pin };
    case types.LOAD_PIN_FAIL || types.SET_PIN_FAIL:
      return { ...state, loading: false, error: action.error };

    default:
      return state;
  }
};
