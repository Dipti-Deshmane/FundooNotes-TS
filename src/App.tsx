import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRouter from './Router/AppRouter';
import { Container } from 'reactstrap';
import { ToastContainer } from 'react-toastify';

import './App.css';

function App() {


  return (
    <div>  
    <Router>
      <Container>
       <AppRouter />
       <ToastContainer />
      </Container>
    </Router>
  </div>
  );
}

export default App;
