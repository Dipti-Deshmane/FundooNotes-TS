import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/login';
import Dashboard from './Pages/Dashboard';
import SignUp from './Pages/signup';
import ColourCard from './Components/ColourCard';
import Trash from './Components/Trash';
import Archive from './Components/Archive';
import './App.css';

function App() {


  return (
    <Router>
      <div className="App">
   
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/Trash" element={<Trash/>} />
          <Route path="/Archive" element={<Archive/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
