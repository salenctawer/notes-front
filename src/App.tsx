import React from 'react';
import Header from './components/Header/Header';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import FullNote from './components/FullNote/FullNote';
import AddNote from './components/AddNote/AddNote';


function App() {
  return (
    <div className="App">
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/note/:id' element={<FullNote />}/>
          <Route path='/addnote' element={<AddNote />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/registration' element={<Registration />}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
