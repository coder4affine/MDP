import * as types from '../constants/actionTypes';

const languageChanged = locale => ({
  type: types.LANGUAGE_CHANGED,
  locale,
});

export default languageChanged;
