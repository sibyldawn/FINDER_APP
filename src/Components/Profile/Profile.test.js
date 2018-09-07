import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { Profile } from './Profile.js'

const ProfileProps = {
    context: {
        login: false
    },
    classes: {
        progress: false
    }
}

describe('<TestComponent />', () => {
    it('renders NoUser when there is no user logged in', () => {
        const wrapper = shallow(<Profile {...ProfileProps} />, {disableLifecycleMethods: true})
        // console.log('------------ wrapper', wrapper.getElement())
        expect(wrapper.getElement().props.className).toBe('NoUser')
    })

    it('renders loading symbol when logged in but no data is present', () => {
        const PropCopy = {...ProfileProps}
        PropCopy.context.login = true
        PropCopy.classes.progress = true
        const wrapper = shallow(<Profile {...PropCopy} />, {disableLifecycleMethods: true})
        console.log('------------ wrapper', wrapper.children())
        expect(wrapper.getElement().props.className).toBeTruthy()
    })
})