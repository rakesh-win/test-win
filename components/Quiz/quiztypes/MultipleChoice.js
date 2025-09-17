import React from 'react'

function MultipleChoice({questions,currentQuestion,options,ansgiven,handleAnswerOptionClick}) {
  return (
    <div className='answer-section'>
    {options.length ? options.map(opns => (
      <button
        key={opns.id}
        className='option-block'
        style={{
          display: (questions[currentQuestion].id == opns.question_id) ? 'block' : 'none',
          background: ansgiven.find(ansg => ansg.opnid == opns.id) ? '#f0ebf7' : '#fff'
        }}
        onClick={() => handleAnswerOptionClick(opns)}
      > {opns.option}
      </button>
    )) : (<h3>Loading..</h3>)}
  </div>  )
}

export default MultipleChoice