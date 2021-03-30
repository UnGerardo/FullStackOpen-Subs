import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState({ 0:0, 1:0, 2:0, 3:0, 4:0, 5:0 });

  const getPopularAnecdote = () => {
    let maxVotes = {
      votes: 0,
      index: 0
    };

    const keys = Object.keys(votes);
    
    for(let i = 0; i < keys.length; i++) {
      if(votes[i] > maxVotes.votes) {
        maxVotes.votes = votes[i];
        maxVotes.index = i;
      }
    }

    return (
      <>
        <p>{anecdotes[maxVotes.index]}</p>
        <p>has {maxVotes.votes} votes</p>
      </>
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={() => setVotes({ ...votes, [selected]: votes[selected] + 1 })}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random()*(6)))}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {getPopularAnecdote()}
    </div>
  )
}

export default App