import React from 'react'
import './index.css'

const Note = (props) => (
	<div className="note" style={{backgroundColor: `light${props.color}`}}>
		<i className="fa fa-times-circle icon-delete" onClick={props.onDelete}/>
		<textarea className="note-text" value={props.text} onChange={props.onChange} /> 
	</div>
)

export default Note