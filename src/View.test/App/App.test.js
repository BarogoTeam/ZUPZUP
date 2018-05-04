import React from 'react';
import App from '../../view/App/App.js';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('App.js Test', () => {
    describe('Render 테스트', () => {
        it ('Main Div가 렌더링 되어야 한다.', () => {
            let result = shallow(<App/>)
            expect(result.find('#Main').length).toEqual(1);
        });
    });
});