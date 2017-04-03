import React from 'react';
import ReactDOM from 'react-dom';
import { createLogger } from './components/Logger'; // eslint-disable-line

const MAX_VALUE = 10;

const root = document.getElementById('root');
const logger = createLogger();

ReactDOM.render(
    React.createElement(
        'h1',
        null,
        'Home Page',
    ),
    root,
);

function render(value) {
  const div = document.createElement('div');
  div.innerText = value;
  document.body.appendChild(div);
}

for (const i of logger) { // eslint-disable-line
  if (i > MAX_VALUE) {
    break;
  }
  render(i);
}
