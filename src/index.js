
import 'bootswatch/dist/lumen/bootstrap.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom'; // changed
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserProvider} from './context'
// changed
ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();