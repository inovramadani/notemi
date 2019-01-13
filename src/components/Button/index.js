import React from 'react'
import './index.css'

const Button = (props) => (
	<span 
		id={props.id ? props.id : ''} 
		className={props.className ? 'btn ' + props.className : 'btn'}
		onClick={props.onClick}
		style={{backgroundColor: props.color ? props.color : '#2196f3'}}
	>
		{props.children}
	</span>
)

export default Button