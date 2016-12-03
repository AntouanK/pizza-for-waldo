
'use strict';

const React           = require('react');
const ReactDOM        = require('react-dom');
const Order           = require('./Components/Page/Order');
const fetchPizzaData  = require('./Actions/FetchPizzaData');
const mountElement    = document.querySelector('#react-mount');

fetchPizzaData();

ReactDOM.render
  ( <Order />
  , mountElement
  );