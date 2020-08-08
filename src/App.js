import React from 'react';

import MapDisplay from './Components/MapDisplay'

import './App.css';
import LocUpload from './Components/LocUpload';

function App() {
  return (
    <div className="App">
      <MapDisplay />
      <LocUpload />
    </div>
  );
}

export default App;
