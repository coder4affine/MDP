import * as types from '../constants/actionTypes';

const initialState = {
  loading: false,
  user: null,
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
