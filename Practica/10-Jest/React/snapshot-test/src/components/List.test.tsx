import renderer from 'react-test-renderer'
import { List } from './List'

it('renders when there are not items', () => {
  const tree = renderer.create(<List list={[]} />).toJSON()

  expect(tree).toMatchSnapshot()
})

it('renders when there are three items', () => {
  const tree = renderer
    .create(<List list={['Vlad', 'Max', 'Kravich']} />)
    .toJSON()

  expect(tree).toMatchSnapshot()
})
