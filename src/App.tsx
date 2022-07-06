import React from 'react';
import Header from './components/Header/Header';
import Notes from './components/Notes/Notes';
import UserInfo from './components/UserInfo/UserInfo';
import Container from '@mui/material/Container';


function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth='lg'>
        <UserInfo />
        <Notes />
      </Container>
    </div>
  );
}

export default App;
