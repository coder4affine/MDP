import * as types from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_ALERTS:
      return { ...state, loading: true };
    case types.LOAD_ALERTS_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case types.LOAD_ALERTS_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
