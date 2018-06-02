import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

import App from './View/App/App';
import registerServiceWorker from './registerServiceWorker';
import store from "./Redux/Store";

import 'semantic-ui-css/semantic.min.css';
import './index.css';


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
registerServiceWorker();
