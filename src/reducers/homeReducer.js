import * as types from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.HOME_REQUEST:
      return {
        ...state,
        data: [],
        error: false,
        loading: true,
      };
    case types.HOME_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: action.payload,
      };
    case types.HOME_FAIL:
      return {
        ...state,
        data: null,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
