import React, { useState } from 'react';

function Button({ text, handleClick }) {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

function Statistic({ text, data }) {
  return <p>{text} {data}</p>
}

function Statistics({ goodCount, neutralCount, badCount }) {

  if(goodCount || neutralCount || badCount) {
    return (
      <>
        <h1>statistics</h1>
        <Statistic text='good' data={goodCount} />
        <Statistic text='neutral' data={neutralCount} />
        <Statistic text='bad' data={badCount} />
        <Statistic text='all' data={goodCount + neutralCount + badCount} />
        <Statistic text='average' data={(goodCount - badCount)/(goodCount + neutralCount + badCount)} />
        <Statistic text='positive' data={`${goodCount/(goodCount + neutralCount + badCount) * 100} %`} />
      </>
    );
  } else {
    return (
      <>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </>
    );
  }
}

function App() {

  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  return (
    <div className="App">
      <h1>give feedback</h1>
      <Button text='good' handleClick={() => setGoodCount(goodCount + 1)}/>
      <Button text='neutral' handleClick={() => setNeutralCount(neutralCount + 1)}/>
      <Button text='bad' handleClick={() => setBadCount(badCount + 1)}/>
      <Statistics goodCount={goodCount} neutralCount={neutralCount} badCount={badCount} />
    </div>
  );
}

export default App;
