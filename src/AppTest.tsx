import {useEffect, useState} from 'react';

const App = () => {

  const [randomNum, setRandomNum] = useState(5);

  const handleRandomNum = () => {
    setRandomNum(Math.floor(Math.random() * (89999999 + 1) + 10000000));
  };

  return (
    <div>
      <button onClick={handleRandomNum}>
        Randow
      </button>
      {randomNum}
    </div>
  );
};

export default App;