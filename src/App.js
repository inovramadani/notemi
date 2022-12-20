import React, { Component } from 'react'
import queryString from 'query-string'

import { db } from './firebase'

import './App.css'
import Button from './components/Button'
import Note from './components/Note'
import ColorPicker from './components/ColorPicker'

let docName = 'user1'
class App extends Component {
  state = {
    title: 'Notemi',
    text: '',
    colors: ['blue', 'grey', 'green'],
    selectedColor: 'blue',
    notes: []
  }

  render() {
    const { 
      title, 
      text,
      selectedColor,
      colors,
      notes 
    } = this.state

    return (
      <div className="App">
        <h1 className="title center">{title}</h1>
        <Button id="btn-save" onClick={this.handleClickSave}>Save</Button>
        <div className="input-note">
          <input id="input-new-note" value={text} onChange={this.handleChangeText} />
          <Button id="btn-add" onClick={this.handleClickAddNote}>Add note</Button>
        </div>
        <ColorPicker colors={colors} selectedColor={selectedColor} onChange={this.handleChangeColor} />
        <div className='notes'>
        { 
          notes.map((note, index) => (
            <Note 
              key={index}
              color={note.color} 
              text={note.text} 
              onChange={event => this.handleChangeNoteText(event, index)}
              onDelete={event => this.handleClickDeleteNote(index)}
            />
          )) 
        }
        </div>
      </div>
    )
  }

  componentWillMount() {
    const { user } = queryString.parse(window.location.search)
    if (user) docName = user
    this.loadData()
  }

  loadData() {
    return new Promise((resolve, reject) => {
      db.get().then((querySnapshot) => {
        let notes = []
        querySnapshot.forEach((doc) => {
          if (doc.id === docName) {
            notes = doc.data().notes
          }
        })

        this.setState({ notes })
        resolve('success')
      }).catch(error => {
        console.error(error)
        reject('failed')
      })
    })
  }

  handleClickSave = () => {
    this.saveData()
  }

  saveData() {
    return new Promise((resolve, reject) => {
      const { notes } = this.state     
      
      db.doc(docName).set({notes})
      .then(() => {
        window.alert('notes saved in database')
        resolve('success')
      })
      .catch(error => {
        console.error(error)
        reject('failed')
      })      
    })
  }

  handleChangeText = ({ target }) => {
    this.setState({ text: target.value })
  }

  handleChangeColor = ({ target }) => {
    this.setState({ selectedColor: target.value })
  }

  handleClickAddNote = () => {
    const { selectedColor: color, text, notes } = this.state
    const newNote = { color, text }
    const newNotes = [...notes, newNote]

    this.setState({ notes: newNotes })
  }

  handleChangeNoteText = ({ target }, index) => {
    const { notes } = this.state

    notes[index].text = target.value

    this.setState({ notes })
  }

  handleClickDeleteNote = (index) => {
    const { notes } = this.state
    const newNotes = [...notes]

    newNotes.splice(index, 1)
    this.setState({ notes: newNotes })
  }
}

export default App;
