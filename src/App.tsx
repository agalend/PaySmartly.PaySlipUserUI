import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {
  const instance = axios.create({
    baseURL: 'http://localhost:9080/api/',
    timeout: 5000
  });

  instance.get('/archive/pay-slips/annual-salary?from=60000&to=100000&limit=20&offset=0')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.12345
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
