import React from 'react'

const ColorPicker = (props) => {
	return (
		<div className="color-picker">
		<form id="select-color-picker" onChange={props.onChange} >
		{
			props.colors.map((color, index) => (
				<span key={index}>
					<input 
						className="color-picker-item"
						type="radio" 
						name="color-picker" 
						checked={color === props.selectedColor} 
						value={color}
						onChange={props.onChange}
					/>
					<span>{color}</span>
				</span>
			))
		}
		</form>
		</div>
	)
}

export default ColorPicker