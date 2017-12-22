// @flow
import { combineReducers } from 'redux';
import app from './appReducer';
import locale from './languageReducer';
import pin from './pinReducer';

const rootReducer = combineReducers({
  app,
  locale,
  pin,
});

export default rootReducer;
