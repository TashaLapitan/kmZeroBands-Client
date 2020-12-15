import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import MyProfile from './pages/MyProfile';
import GigBoard from './pages/GigBoard';
import BandPage from './pages/BandPage';
import FAQ from './pages/FAQ';

import Navbar from './components/Navbar';
import AnonRoute from './components/AnonRoute';
import PrivateRoute from './components/PrivateRoute';




function App () {

    return (
      <div className="container">
        <Navbar />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/gigboard" component={GigBoard} />
          <Route exact path="/faq" component={FAQ} />

          <AnonRoute exact path="/signup" component={Signup} />
          <AnonRoute exact path="/login" component={Login} />

          <PrivateRoute exact path="/my-profile" component={MyProfile} />
          <Route exact path="/:endpoint" component={BandPage}/>
        </Switch>
      </div>
    );
  }

export default App;
