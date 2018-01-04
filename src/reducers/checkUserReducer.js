import * as types from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: false,
  updatedOn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.CHECK_USER_EXIST_REQUEST:
      return { ...state, loading: true };
    case types.CHECK_USER_EXIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        updatedOn: action.action,
      };
    case types.CHECK_USER_EXIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
