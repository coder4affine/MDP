// @flow
import { Provider } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import configureStore from './configureStore';
// import * as appActions from './reducers/app/actions';
import { registerScreens } from './screens';

const store = configureStore();

registerScreens(store, Provider);

const startApp = () => {
  Navigation.startSingleScreenApp({
    screen: {
      screen: 'mdp.PinScreen',
      title: 'Pin',
      navigatorStyle: {},
    },
  });
};

export default class App {
  constructor() {
    // store.subscribe(this.onStoreUpdate.bind(this));
    // store.dispatch(appActions.appInitialized());
    startApp();
  }

  // onStoreUpdate() {
  //   const { root } = store.getState().app;
  //   if (this.currentRoot !== root) {
  //     this.currentRoot = root;
  //     startApp(root);
  //   }
  // }
}
