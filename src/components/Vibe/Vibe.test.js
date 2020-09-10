import React from 'react'
import Vibe from './Vibe'
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  const tree = renderer.create(<Vibe playing={true} />).toJSON()
  expect(tree).toMatchSnapshot()
})
