import React from 'react'

const Progress_sml = ({bgcolor,progress,height}) => {
	
	const Parentdiv = {
		height: height,
		width: '95%',
		backgroundColor: 'whitesmoke',
		borderRadius: 40,
		margin: '0px'
	}
	
	const Childdiv = {
		height: '100%',
		width: `${progress}%`,
		backgroundColor: bgcolor,
	borderRadius:40,
		textAlign: 'right'
	}
	
	const progresstext = {
		padding: 10,
		color: 'black',
		fontWeight: 200,
		whiteSpace: 'nowrap'
	}
		
	return (
	<div style={Parentdiv}>
	<div style={Childdiv}>
		<span style={progresstext}>{`Progress: ${progress}%`}</span>
	</div>
	</div>
	)
}

export default Progress_sml;
