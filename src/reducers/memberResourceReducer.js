import * as types from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: false,
  updatedOn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_MEMBER_RESOURCE:
      return { ...state, loading: true };
    case types.LOAD_MEMBER_RESOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        updatedOn: action.action,
      };
    case types.LOAD_MEMBER_RESOURCE_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
