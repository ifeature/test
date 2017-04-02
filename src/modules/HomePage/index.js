import React from 'react';
import { render } from 'react-dom';

const root = document.getElementById('root');

render(
    React.createElement(
        'h1',
        null,
        'Home Page'
    ),
    root
);