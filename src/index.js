import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';
import {BrowserRouter} from 'react-router-dom'

let renderTarget = document.getElementById('app');
if (renderTarget) {
  ReactDOM.render(<BrowserRouter><App/></BrowserRouter>, renderTarget);
}
