import {useEffect} from 'react';

const App = () => {

  let logOut = () => {
    localStorage.clear();
  }

  useEffect(() => {
    const handleTabClose = (event: any) => {
      event.preventDefault();

      console.log('beforeunload event triggered');

      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
    logOut()
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);

  return (
    <div>
      <h2>hello world</h2>
    </div>
  );
};

export default App;