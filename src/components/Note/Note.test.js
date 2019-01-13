import React from 'react'
import Note from './index'
import {shallow, mount, render} from 'enzyme'
import renderer from 'react-test-renderer'

describe('<Note />', () => {
	it('renders Note element correctly', () => {
		const note = renderer.create(<Note color="blue" text="hello" style={{backgroundColor: 'lightblue'}}/>).toJSON()
		expect(note).toMatchSnapshot()
	})
})