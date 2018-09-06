import { shallow, mount, render } from 'enzyme'
import Profile from './Profile'

describe('<TestComponent />', () => {
    it('renders NoUser when there is no user logged in', () => {
        const wrapper = shallow(Profile)
        console.log('------------ wrapper', wrapper)
    })
})