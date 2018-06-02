import React from 'react';
import App from '../../view/App/App.js';
import {shallow} from 'enzyme';


describe('App Test', () => {
  describe('Render Test', () => {
    it ('BasicRouter가 렌더링 되어야 한다.', () => {
      let result = shallow(<App />);

      expect(result.find('BasicRouter')).toHaveLength(1);
    });
  });
});