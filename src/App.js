import React from 'react';


import MapDisplay from './Components/MapDisplay'

import './App.css';
import LocUpload from './Components/LocUpload';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <MapDisplay />
          </Route>
          <Route path='/new-location' exact>
            <LocUpload />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
