import * as types from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: false,
  updatedOn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.HOME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case types.HOME_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        updatedOn: action.action,
      };
    case types.HOME_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
