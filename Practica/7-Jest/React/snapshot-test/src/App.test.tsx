import renderer from 'react-test-renderer'
import { App } from './App'

describe('App other', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
