import React from 'react';


import MapDisplay from './Components/MapDisplay';
import AdminPanel from './Components/AdminPanel';

import './App.css';

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
            <AdminPanel />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
