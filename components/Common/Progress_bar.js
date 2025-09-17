import React from 'react'

const Progress_bar = ({bgcolor,progress,height,ismobile}) => {
	
	const Parentdiv = {
		height: height,
		width: '100%',
		backgroundColor: 'whitesmoke',
		borderRadius: 40,
		margin: ismobile ? '15px 0px 15px 20px' : '15px 0px 15px 90px'
		
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
		fontWeight: 900,
		whiteSpace: 'nowrap'
	}
		
	return (
	<div style={Parentdiv}>
	<div style={Childdiv}>
		<span style={progresstext}>{`Learning Progress: ${progress}%`}</span>
	</div>
	</div>
	)
}

export default Progress_bar;
