import React from 'react';
import { shallow } from 'enzyme';

import ChatForm from './ChatForm';

describe('ChatForm', () => {
    it('should render 1 input form ',() => {
        const wrapper = shallow(<ChatForm/>);

        expect(wrapper.find('input')).to.have.lengthOf(1);
    });

    it('find 1 button ', () => {
        const wrapper = shallow(<ChatForm/>);

        expect(wrapper.find('button')).to.have.lengthOf(1);
    });

})