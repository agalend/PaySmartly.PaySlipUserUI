import React from 'react';
import logo from './logo.svg';
import './App.css';
import restApiClient from './api/client';

function App() {
  // restApiClient.create({
  //   employee: { firstName: "Dragan", lastName: "Draganov" },
  //   annualSalary: 60050,
  //   superRate: 9,
  //   payPeriodFrom: new Date(),
  //   payPeriodTo: new Date(),
  //   roundTo: 2,
  //   months: 12,
  //   requester: { firstName: "Unknown", lastName: "Unknown" },
  // })
  //   .then((result) => {
  //     const r = result;
  //   })
  //   .catch(error => {
  //     const e = error;
  //   });

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