import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { Profile } from './Profile.js'
import { expect } from  '../../setupTests'

// Creating fake, manipulatable props for the shallow mounted component
const ProfileProps = {
    context: {
        login: false
    },
    classes: {
        progress: 'progress',
        button: 'button',
        container: 'container'
    }
}


// The expects used in this file are Chai's expect function. Check setupTests file for the configuration and import.
describe('<TestComponent />', () => {
    it('renders no user when there is no user logged in', () => {
        const wrapper = shallow(<Profile {...ProfileProps} />, {disableLifecycleMethods: true})
        expect(wrapper.find('.no-user')).to.have.lengthOf(1)
    })

    it('renders loading symbol when logged in but no data is present', () => {
        const PropCopy = {...ProfileProps}
        PropCopy.context.login = true
        const wrapper = shallow(<Profile {...PropCopy} />, {disableLifecycleMethods: true})
        expect(wrapper.exists('.loading-circle')).to.be.true
    })

    it('displays profile card when logged in and data is present', () => {
        const PropCopy = {...ProfileProps}
        PropCopy.context.login = true
        const wrapper = shallow(<Profile {...PropCopy} />, {disableLifecycleMethods: true})
        wrapper.setState({ first_name: true })
        expect(wrapper.exists('.user-card')).to.be.true
    })

    it('switched to edit view when edit button is clicked', () => {
        const PropCopy = {...ProfileProps}
        PropCopy.context.login = true
        const wrapper = shallow(<Profile {...PropCopy} />, {disableLifecycleMethods: true})
        wrapper.setState({ first_name: true })
        wrapper.find('.button').simulate('click')
        expect(wrapper.find('.container')).to.have.lengthOf(1)
    })
})