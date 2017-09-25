import ReactDOM from 'react-dom';
import React from 'react';
import App from './app';

let renderTarget = document.getElementById('app');
if (renderTarget) {
  ReactDOM.render(<App/>, renderTarget);
}
