import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {shallow, mount, render} from 'enzyme'
import renderer from 'react-test-renderer'
import firebase from './firebase'
import db, { data_db_mock } from './db_mock'

describe('<App />', () => {
	it('renders without crashing', () => {
	  const div = document.createElement('div')
	  ReactDOM.render(<App />, div)
	  ReactDOM.unmountComponentAtNode(div)
	})

	it('renders correctly', () => {
		const app = renderer.create(<App />).toJSON()
		expect(app).toMatchSnapshot()
	})

	it('should be able to add note', () => {
		const app = shallow(<App />)
		app.find('#btn-add').simulate('click')
		app.find('#btn-add').simulate('click')
		app.find('#btn-add').simulate('click')
		app.find('#btn-add').simulate('click')
		expect(app.state().notes.length).toBe(4) // check on state

		app.update()
		expect(app.find('.notes').children()).toHaveLength(4) // check on node
	})

	it('should be able to edit note', () => {
		const app = mount(<App />)
		app.setState({notes: [{color: 'blue', text: 'hello'}]})
		app.find('.note-text').simulate('change', {target: {value: 'hallo'}})
		expect(app.state().notes[0].text).toBe('hallo') // check on state

		app.update()
		expect(app.find('.note-text').text()).toBe('hallo') // check on node
		app.unmount()
	})

	it('should be able to delete note on state (1)', () => {
		const app = shallow(<App />)
		app.find('#btn-add').simulate('click') // add one note
		app.instance().handleClickDeleteNote(0) // delete the note
		expect(app.state().notes).toEqual([])
	})

	it('should be able to delete note on state (2)', () => {
		const app = mount(<App />)
		app.setState({notes: [{color: 'blue', text: 'hello'}]}) // add one note
		app.find('.icon-delete').simulate('click') // delete the note
		expect(app.state().notes).toEqual([])
		app.unmount()
	})

	it('should be able to delete note on node', () => {
		const app = shallow(<App />)
		app.instance().handleClickAddNote() // add one note
		app.instance().handleClickDeleteNote(0) // delete the note
		expect(app.find('.notes').children()).toHaveLength(0)
	})

	it('should delete correct item in the notes array', () => {
		const app = mount(<App />)

		// check on state
		const notes = [{color: 'blue', text: '1'}, {color: 'green', text: '2'}, {color: 'grey', text: '3'}]
		app.setState({notes})
		app.instance().handleClickDeleteNote(1) // delete note {color: 'green', text: '2'}

		const updatedNotes = [{color: 'blue', text: '1'}, {color: 'grey', text: '3'}]
		expect(app.state().notes).toEqual(updatedNotes) 

		app.update()

		// check on node
		const node_notes = app.find('.notes')
		expect(node_notes.children()).toHaveLength(2)

		const node_colors = app.find('.note').getElements().map(el => el.props.style)
		expect(node_colors).toEqual([{backgroundColor: 'lightblue'}, {backgroundColor: 'lightgrey'}])

		const node_texts = app.find('.note-text').getElements().map(el => el.props.value)
		expect(node_texts).toEqual(['1','3'])
		
		app.unmount()
	})

	it('should be success to load notes from database', () => {
		const app = shallow(<App />)
		return app.instance().loadData().then(res => {
			expect(res).toBe('success')
		})
	})

	it('should be able to load mock data (mock firebase API call)', () => {
		jest.mock('./firebase')
		// const getDataSpy = jest.spyOn(firebase.firestore().collection('notes'), 'get')
		firebase.firestore().collection('notes').get = jest.fn().mockImplementation(() => data_db_mock)

		const app = shallow(<App />)
		return app.instance().loadData().then(res=> {
			expect(app.state().notes).toBe(data_db_mock)
		})
	})

	it('should be able to save notes to database and load same data (real firebase API call)', () => {
	 	window.alert = jest.fn()
		const app = shallow(<App />)

		// store new data
		const notes = [{color: 'blue', text: 'hello blue'}, {color: 'grey', text: 'hi grey'}]
		app.setState({notes})
		return app.instance().saveData().then(res => {
			expect(res).toBe('success')
			expect(window.alert).toBeCalledWith('notes saved in database')
			
			// loading method that will check the amount of notes
			return app.instance().loadData().then(res => {
				expect(res).toBe('success')
				expect(app.state().notes).toEqual(notes)
			})
		})
	})

	it('should be able to change state color', () => {
		const app = mount(<App />)
		app.find('#select-color-picker').simulate('change', {target: {value: 'green'}}) // click on green radio button
		expect(app.state().selectedColor).toBe('green')
	})

	it('should add note with default color blue', () => {
		const app = mount(<App />)
		app.instance().handleClickAddNote()
		app.update()
		const note = app.find('.note').get(0)
		expect(note.props).toHaveProperty('style', {backgroundColor: 'lightblue'})
		app.unmount()
	})

	it('should render note with correct color', () => {
		const app = mount(<App />)
		app.setState({notes: [{color: 'grey', text: 'hello'}]}) // add one blue note
		const note = app.find('.note').get(0)
		expect(note.props).toHaveProperty('style', {backgroundColor: 'lightgrey'})
		app.unmount()
	})


	it('should add note with correct color after user select a color', () => {
		const app = mount(<App />)
		app.find('#select-color-picker').simulate('change', {target: {value: 'green'}}) // click on green radio button
		app.instance().handleClickAddNote()
		app.update()
		const note = app.find('.note').get(0)
		expect(note.props).toHaveProperty('style', {backgroundColor: 'lightgreen'})
		app.unmount()
	})

	it('should add note with the same text', () => {
		const app = mount(<App />)
		app.find('#input-new-note').simulate('change', {target: {value: 'take this note'}})
		app.instance().handleClickAddNote()
		const notes = [{color: 'blue', text: 'take this note'}] // assert text value on state, blue is default color
		expect(app.state().notes).toEqual(notes)
		
		app.update()
		expect(app.find('.note-text').text()).toBe('take this note') // assert text value on node
		app.unmount()
	})	
})
