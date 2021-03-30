import React, { useState } from 'react';

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
      <h1>statistics</h1>
      <p>good {goodCount}</p>
      <p>neutral {neutralCount}</p>
      <p>bad {badCount}</p>
    </div>
  );
}

export default App;
