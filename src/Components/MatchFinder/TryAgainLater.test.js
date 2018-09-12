import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import TryAgainLater from './TryAgainLater';


describe('Page displays Animation', () => {
  it('renders one div with the class lottie-container', () => {
    const wrapper = shallow(<TryAgainLater />);
    expect(wrapper.find('.lottie-container')).to.have.lengthOf(1);
  });

  it('renders an h1 with text', () => {
    const wrapper = shallow(<TryAgainLater />);
    expect(wrapper.find('h1')).to.have.lengthOf(1);
  });

  it('renders an h3 with text', () => {
    const wrapper = shallow(<TryAgainLater />);
    expect(wrapper.find('h3')).to.have.lengthOf(1);
  });

})