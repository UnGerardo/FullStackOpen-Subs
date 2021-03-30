import React, { useState } from 'react';

function Statistics({ goodCount, neutralCount, badCount }) {
  return (
    <div className="App">
      <h1>statistics</h1>
      <p>good {goodCount}</p>
      <p>neutral {neutralCount}</p>
      <p>bad {badCount}</p>
      <p>all {goodCount + neutralCount + badCount}</p>
      <p>average {(goodCount - badCount)/(goodCount + neutralCount + badCount)}</p>
      <p>positive {goodCount/(goodCount + neutralCount + badCount) * 100} %</p>
    </div>
  );
}

function App() {

  const [goodCount, setGoodCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [badCount, setBadCount] = useState(0);

  return (
    <div className="App">
      <h1>give feedback</h1>
      <button onClick={() => setGoodCount(goodCount + 1)}>good</button>
      <button onClick={() => setNeutralCount(neutralCount + 1)}>neutral</button>
      <button onClick={() => setBadCount(badCount + 1)}>bad</button>
      <Statistics goodCount={goodCount} neutralCount={neutralCount} badCount={badCount} />
    </div>
  );
}

export default App;
