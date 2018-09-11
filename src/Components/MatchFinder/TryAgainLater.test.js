import React from 'react';
import { shallow } from 'enzyme';

import TryAgainLater from './TryAgainLater';

describe('TryAgainLater', () => {
    it('should render 1 div with class "lottie-container" ',() => {
        const wrapper = shallow(<TryAgainLater/>);

        expect(wrapper.find('div.lottie-container')).to.have.lengthOf(1);
    });

    it('includes an h1 with an  OUT LOOKING FOR MORE CONNECTIONS text', () => {
        const wrapper = shallow(<TryAgainLater/>);

        expect(wrapper.find('h1').text()).to.be.equal('OUT LOOKING FOR MORE CONNECTIONS.')
    });

    it("includes an h3 with an We'll e-mail you when you get a match! text", () => {
        const wrapper = shallow(<TryAgainLater/>);

        expect(wrapper.find('h3').text()).to.be.equal("We'll e-mail you when you get a match!")
    });
})