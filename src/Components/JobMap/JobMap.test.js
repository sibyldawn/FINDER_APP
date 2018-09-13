import React from 'react';
import { expect }  from 'chai';
import { shallow } from 'enzyme';

import JobMap from './JobMap';

describe('This displays the available jobs', () => {
    it('renders the div with the name job ', () => {
        const wrapper = shallow( <JobMap />);
        expect(wrapper.text('div.jobsearch')).to.equal('Job Search')
    })
    

})


//eric enzyme test#1