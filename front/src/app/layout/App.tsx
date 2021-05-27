import React from 'react';
import './styles.css';
import Navbar from '../../Components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' />
          <Route path='/reports'/>
          <Route path='/products' />
        </Switch>
      </Router>
    </>
  );
}

export default App;