import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import App from './web/App';
import registerServiceWorker from './web/registerServiceWorker';
import configureStore from './store/configureStore.web';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
