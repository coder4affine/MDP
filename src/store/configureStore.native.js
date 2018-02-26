import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './../reducers';

let middleware = [thunk];

if (__DEV__) {
  middleware = [...middleware, logger];
} else {
  middleware = [...middleware];
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleware)));
  persistStore(store, null, () => {
    store.getState();
  });
  return store;
}
