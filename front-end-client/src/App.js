import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Navbar from './components/Navbar';

import ViewClient from './components/ViewClient';
import AddClient from './components/AddClient';
import EditClient from './components/EditClient';

import axios from 'axios';
axios.defaults.baseURL = "http://localhost:8000/";

function App() {
  return (
    <div className="App">
        <Router>

          <Navbar />

          <Switch>

            <Route path="/clients" component={ViewClient} />
            <Route path="/add-client" component={AddClient} />
            <Route path="/edit-client/:id" component={EditClient} />

          </Switch>
        </Router>
    </div>
  );
}

export default App;