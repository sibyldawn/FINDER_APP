import React from 'react';
import { expect }  from 'chai';
import { shallow } from 'enzyme';
import JobMatched from './JobMatched';


describe('JobMatched', () => {
    it('this should find a button somewhere', () => {
        const wrapper = shallow(<JobMatched/>);

        expect(wrapper.find('button')).to.has.lengthOf(2);
    });
  
    it('find a link', () => {
        const wrapper = shallow(<JobMatched/>);
    
        expect(wrapper.find('Link')).to.has.lengthOf(2);
    });
})




//eric enzyme test#2 and 3