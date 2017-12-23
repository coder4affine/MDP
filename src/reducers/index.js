// @flow
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import app from './appReducer';
import locale from './languageReducer';
import pin from './pinReducer';

const pinPersistConfig = {
  key: 'pin',
  storage,
};

export default {
  app,
  locale,
  pin,
};
