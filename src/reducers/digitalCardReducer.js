import * as types from '../constants/actionTypes';

const initialState = {
  loading: false,
  data: null,
  error: false,
  updatedOn: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_DIGITAL_CARD:
      return { ...state, loading: true };
    case types.LOAD_DIGITAL_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        updatedOn: action.action,
      };
    case types.LOAD_DIGITAL_CARD_FAIL:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
