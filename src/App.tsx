import React, { useEffect } from 'react';
import Header from './components/Header/Header';
import Container from '@mui/material/Container';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import Home from './components/Home/Home';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchAuthMe, selectAuth } from './redux/authSlice';


function App() {

  const dispatch = useAppDispatch()

  // const isAuth = useAppSelector(selectAuth)


  useEffect(()=>{
    dispatch(fetchAuthMe())
  }, [])

  return (
    <div className="App">
      <Header />
      <Container maxWidth='lg'>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/registration' element={<Registration />}/>
        </Routes>
      </Container>
    </div>
  );
}

export default App;
