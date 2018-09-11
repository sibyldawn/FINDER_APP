import React from 'react';
import { shallow } from 'enzyme';

import Footer from './Footer';

describe('Footer', () => {
    it('should link to Messages ',() => {
        const wrapper = shallow(<Footer/>);

        expect(wrapper.find('Link')).prop('to').toEqual("/Messages");
    });

    it('should link to MatchFinder ',() => {
        const wrapper = shallow(<Footer/>);

        expect(wrapper.find('Link')).prop('to').toEqual("/");
    });

    it('should link to JobMap ',() => {
        const wrapper = shallow(<Footer/>);

        expect(wrapper.find('Link')).prop('to').toEqual("/JobMap");
    });
})