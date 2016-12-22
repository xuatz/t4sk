import React from 'react';

const CustomInput3 = (props) => {
	return (
		<div style={{
			display: 'flex',
			flexWrap: 'wrap',
			// padding: '4px 0px',
			justifyContent: 'space-around'
			// justifyContent: 'center'
		}} >
			<label style={{
				flex: '1',
				textAlign: 'right',
				marginRight: '5px'
			}} >
				{props.label}
			</label>

			{ props.type == 'textarea' ? (
				<textarea 
					style={{
						flex: '3',
						textAlign: 'left'
					}}
					placeholder={props.placeholder} 
					value={props.value}
					onChange={(e)=>{
						// console.log('e.target.value', e.target.value);
						// console.log('props.name', props.name);
						props.onChange({
							[props.name]: e.target.value
						})
					}} />
			) : (
				<input 
					style={{
						flex: '3',
						textAlign: 'left'
					}} 
					type={props.type}
					placeholder={props.placeholder} 
					value={props.value}
					onChange={(e)=>{
						// console.log('e.target.value', e.target.value);
						// console.log('props.name', props.name);
						props.onChange({
							[props.name]: e.target.value
						})
					}} />
			) }

				
		</div>
	)
}

export default CustomInput3