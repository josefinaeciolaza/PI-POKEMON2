import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage/Landing';
import Home from './Pages/HomePage/Home';
import Form from './Pages/FormPage/Form';
import PageDetail from './Pages/DetailPage/Detail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/home' element={<Home/>} />
        <Route path='/pokemon/:id' element={<PageDetail/>} />
        <Route path='/pokemon/create' element={<Form/>} />
      </Routes>
    </div>
  );
}

export default App;
