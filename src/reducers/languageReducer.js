import * as types from '../constants/actionTypes';
import config from '../config';

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
