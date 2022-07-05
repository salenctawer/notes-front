import React from 'react';
import Header from './components/Header/Header';
import Notes from './components/Notes/Notes';
import UserInfo from './components/UserInfo/UserInfo';


function App() {
  return (
    <div className="App">
      <Header />
      <UserInfo />
      <Notes />
    </div>
  );
}

export default App;
