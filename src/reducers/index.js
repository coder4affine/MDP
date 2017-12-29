// @flow
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { reducer as form } from 'redux-form';
import app from './appReducer';
import locale from './languageReducer';
import pin from './pinReducer';
import auth from './authReducer';
import home from './homeReducer';
import checkUser from './checkUserReducer';
import register from './registerReducer';
import digitalCard from './digitalCardReducer';
import memberResource from './memberResourceReducer';
import alerts from './alertsReducer';

const pinPersistConfig = {
  key: 'pin',
  storage,
};

const homePersistConfig = {
  key: 'home',
  storage,
  blacklist: ['loading', 'error'],
};

const authPersistConfig = {
  key: 'auth',
  storage,
  blacklist: ['loading', 'error'],
};

const digitalCardPersistConfig = {
  key: 'digitalCard',
  storage,
  blacklist: ['loading', 'error'],
};

const memberResourcePersistConfig = {
  key: 'memberResource',
  storage,
  blacklist: ['loading', 'error'],
};

const alertsPersistConfig = {
  key: 'alerts',
  storage,
  blacklist: ['loading', 'error'],
};

export default combineReducers({
  form,
  app,
  locale,
  checkUser,
  register,
  pin: persistReducer(pinPersistConfig, pin),
  auth: persistReducer(authPersistConfig, auth),
  home: persistReducer(homePersistConfig, home),
  digitalCard: persistReducer(digitalCardPersistConfig, digitalCard),
  memberResource: persistReducer(memberResourcePersistConfig, memberResource),
  alerts: persistReducer(alertsPersistConfig, alerts),
});
