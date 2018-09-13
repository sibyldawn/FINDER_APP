import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Message from './Message';


describe('Page displays Animation', () => {
  it('renders one div with the id message', () => {
    const wrapper = shallow(<Message />);
    expect(wrapper.find('#message')).to.have.lengthOf(1);
  });

  it('renders one div with the id container', () => {
    const wrapper = shallow(<Message />);
    expect(wrapper.find('#container')).to.have.lengthOf(1);
  });


})