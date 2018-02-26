import * as types from '../constants/actionTypes';
import * as config from '../config.json';

const initialState = {
  locale: config.defaultLocale,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.LANGUAGE_CHANGED:
      return { ...state, locale: action.locale };

    default:
      return state;
  }
};
