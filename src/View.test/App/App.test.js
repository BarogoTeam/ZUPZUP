import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {mount} from 'enzyme';
import {Provider} from "react-redux";
import store from "../../Redux/Store";

import App from '../../View/App/App.js';


describe('App Test', () => {
  describe('Render Test', () => {
    it ('Main Div가 렌더링 되어야 한다.', () => {
      const result = mount(
        <Provider store={store}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Provider>
      )
      expect(result.find('#Main')).toHaveLength(1);
    });
  });
});