import React from 'react';
import { shallow } from 'enzyme';

import TryAgainLater from './TryAgainLater';

describe('TryAgainLater', () => {
    it('should render 1 div with class "lottie-container" ',() => {
        const component = shallow(<TryAgainLater/>);

        expect(component.find('div.lottie-container')).to.have.lengthOf(1);
    });

    it('includes an h1 with an  OUT LOOKING FOR MORE CONNECTIONS text', () => {
        expect(component.find('h1').text()).to.be.equal('OUT LOOKING FOR MORE CONNECTIONS.')
    });

    it("includes an h3 with an We'll e-mail you when you get a match! text", () => {
        expect(component.find('h3').text()).to.be.equal("We'll e-mail you when you get a match!")
    });
})